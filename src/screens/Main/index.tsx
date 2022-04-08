import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, RefreshControl, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import CodeConfirmationModal from "../../Components/CodeConfirmationModal";
import GameCard from "../../Components/GameCard";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";
import GenericMessageModal from "../../Components/GenericMessageModal";
import NoContent from "../../Components/NoContent";
import Tab from "../../Components/Tab";
import { useAuth } from "../../Contexts/Auth";
import { useRequest } from "../../Contexts/Request";
import { Game, Params } from "../../utils/types";

import {
  BottomNavbar,
  Container,
  GameContainer,
  Games,
  GameTitle,
  GameTitleContainer,
  TopImage,
  AddButton
} from "./styles";

const goal = require('../../../assets/images/goal.png');

const Main: React.FC = () => {
  const {user, signOut, checkLogin, string} = useAuth();
  const {get, destroy, post} = useRequest();

  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<any>(null);
  const [disableAddButton, setDisableAddButton] = useState(true);
  const [userGames, setUserGames] = useState<Game[]>();
  const [friendsGames, setFriendsGames] = useState<Game[]>();
  const [invitedGames, setInvitedGames] = useState<Game[]>();
  const [tab, setTab] = useState<"user" | "invite" | "friends">("user");

  async function getGames() {
    try{
      setLoading(true);
      setDisableAddButton(true);

      await checkLogin();

      const result = await get(`/games/home?_id=${params && params.id ? params.id : ""}&friendGames=${params ? "true" : ''}`, setLoading);

      if (!params) {
        setInvitedGames(result.invitedGames);
        setFriendsGames(result.friendsGames);
      }

      if (result.userGames.length < 5 || user?.premium) {
        setDisableAddButton(false);
      }

      setUserGames(result.userGames);
    } catch(err: any) {
      signOut();
    }
  }

  function handleNavigateToCreateEvent() {
    if (!user?.confirmed) {
      return showModal("NotConfirmed");
    } else if (disableAddButton && !user?.premium && !loading) {
      return showModal("Premium");
    } else if (!disableAddButton) {
      navigation.navigate('CreateEvent');
    } else {
      return;
    }
  }

  function handleNavigateToProfile() {
    navigation.navigate('Profile');
  }

  function navigateToSearchFriends() {
    if (!user?.confirmed) {
      return showModal("NotConfirmed");
    }

    navigation.navigate('SearchFriend');
  }

  function handleConfiguration() {
    if (!user?.confirmed) {
      return showModal("NotConfirmed");
    }

    navigation.toggleDrawer();
  }

  function handleNavigateToPremium() {
    return showModal("PremiumNotAvailable");

    if (!user?.confirmed) {
      return showModal("NotConfirmed");
    }

    navigation.navigate('Premium');
  }

  function editGame(gameId: string) {
    if (!user?.confirmed) {
      return showModal("NotConfirmed");
    }

    navigation.navigate('CreateEvent', {id: gameId});
  }

  useEffect(() => {
    if (isFocused) getGames();
  }, [isFocused]);

  function mapGames(games: Game[], type: "User" | "Friends" | "Invites") {
    return (<>
      {
        games.map(game => (
          <View key={game._id}>
            <GameCard
              type={type}
              host_ID={game.host_ID}
              deleteGame={() => showModal("DeleteGame", game._id)}
              cancelInvite={() => showModal("DeleteGameInvite", game.inviteId)}
              confirmInvite={() => showModal("ConfirmGameInvite", game.inviteId)}
              editGame={() => editGame(game._id)}
              _id={game._id}
              title={game.name}
              location={game.location}
              time={game.hour}
              finished={game.finished}
            />
          </View>
        ))
      }
    </>);
  }

  function renderGamesTab()
  {
      let component, title = "";

      if (loading) return <Loading styles={{marginTop: 25}}/>;

      const noContent = (text: string) => <NoContent text={text} />;

      if (tab === "user") {
        title = !params
                ? "Seus jogos"
                : `Jogos de ${string}`;

        if (userGames && userGames.length > 0) {
          component = mapGames(userGames, "User");
        } else {
          const noContentText = !params
                                ? "Você ainda não criou nenhum jogo"
                                : `${string} ainda não criou nenhum jogo`;
          component = noContent(noContentText);
        }
      } else if (tab === "friends") {
        title = "Jogos de amigos";

        if (friendsGames && friendsGames.length > 0) {
          component = mapGames(friendsGames, "Friends");
        } else {
          component = noContent("Seus amigos ainda não criaram nenhum jogo");
        }
      } else {
        title = "Convites de jogos";

        if (invitedGames && invitedGames.length > 0) {
          component = mapGames(invitedGames, "Invites");
        } else {
          component = noContent("Você ainda não tem convites \n de jogos");
        }
      }

      return (<>
        <GameTitleContainer>
          <GameTitle>{title}</GameTitle>
        </GameTitleContainer>

        <GameContainer>
          {component}
        </GameContainer>
      </>);
  }

  async function resendCode()
  {
    try {
      await post(`/resend-code`, ()=>{}, {});
      setModal(<CodeConfirmationModal visible={true} setModal={() => setModal(null)}/>);
    } catch (error) {
      setModal(null);
      getGames();
    }
  }

  function confirmCode()
  {
    setModal(<CodeConfirmationModal visible={true} setModal={() => setModal(null)}/>);
  }

  async function deleteGame(uuid?: string)
  {
    try {
      await destroy(`/games/${uuid}`, getGames);
      setModal(null);
    } catch (error) {
      setModal(null);
      getGames();
    }
  }

  async function confirmInvite(uuid?: string)
  {
    try {
      await post(`/game-list/invite-confirmation`, getGames, {_id: uuid});
      setModal(null);
    } catch (error) {
      setModal(null);
      getGames();
    }
  }

  async function cancelInvite(uuid?: string)
  {
    try {
      await destroy(`/game-list/${uuid}`, getGames);
      setModal(null);
    } catch (error) {
      setModal(null);
      getGames();
    }
  }

  function showModal(type: any, uuid?: string)
  {
    let functions;

    switch (type) {
      case "NotConfirmed":
        functions = [resendCode, confirmCode];
        break;
      case "DeleteGame":
        functions = [() => deleteGame(uuid), () => setModal(null)];
        break;
      case "ConfirmGameInvite":
        functions = [() => confirmInvite(uuid), () => setModal(null)];
        break;
      case "DeleteGameInvite":
        functions = [() => cancelInvite(uuid), () => setModal(null)];
        break;
    }

    setModal(
      <GenericMessageModal
        type={type}
        setModal={() => setModal(null)}
        functions={functions}
      />
    );
  }

  return (
    <Container style={{paddingTop : params ? 50 : 0}}>
      {params && params.id && <Header />}

      {modal && modal}

      <Games
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getGames}/>
        }
      >
        {!params && <View style={{marginTop: 20}}/>}

        <TopImage>
          <Image source={goal}/>
        </TopImage>

        {!params &&
          <View style={{borderBottomWidth: 1, borderBottomColor: "#f6f6f6", marginBottom: 15}}>
            <Tab
              options={[
                {title: "Seus", state: "user"},
                {title: "Amigos", state: "friends"},
                {title: "Convites", state: "invites"}
              ]}
              setState={setTab}
            />
          </View>}

        {renderGamesTab()}

        <View style={{marginBottom: 20}}/>
      </Games>

      {!params &&
        <BottomNavbar>
          <View>
            <TouchableOpacity onPress={handleConfiguration}>
              <Icon name="gear" size={Dimensions.get("window").width <= 320 ? 26 : 35} color="#686868"/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleNavigateToPremium}>
              <Icon2 name="crown" size={Dimensions.get("window").width <= 320 ? 32 : 43} color="#686868"/>
            </TouchableOpacity>
          </View>
          <View>
            <AddButton
              onPress={handleNavigateToCreateEvent}
              style={{
                width: Dimensions.get("window").width <= 320 ? 49 : 65,
                height: Dimensions.get("window").width <= 320 ? 49 : 65,
                backgroundColor: disableAddButton ? "#686868" : "#268E01"
              }}
            >
              <Icon2 name="plus" size={Dimensions.get("window").width <= 320 ? 30 : 40} color="#fff"/>
            </AddButton>
          </View>
          <View>
            <TouchableOpacity onPress={navigateToSearchFriends}>
              <Icon name="search" size={Dimensions.get("window").width <= 320 ? 32 : 43} color="#686868"/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleNavigateToProfile}>
              <Icon name="user" size={Dimensions.get("window").width <= 320 ? 26 : 35} color="#686868"/>
            </TouchableOpacity>
          </View>
        </BottomNavbar>
      }
    </Container>
  );
}

export default Main;