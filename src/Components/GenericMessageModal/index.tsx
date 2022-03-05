import React from 'react';
import MessageModal from '../MessageModal';

type GenericMessageModalProps = {
  type: "IncorrectCode" | "PasswordsDontMatch" | "SendEvaluations" | "default" | "DeleteFriendInvite" | "DeleteFriend" | "DeleteGameInvite"
        | "ConfirmGameInvite" | "WrongCredentials" | "NotConfirmed" | "Premium" | "DeleteGame" | "Tier" | "EmailAlreadyInUse";
  functions?: Function[];
  setModal: () => void;
  style?: object;
}

const GenericMessageModal: React.FC<GenericMessageModalProps> = ({type, functions, setModal, style}) =>
{
  function getMessage()
  {
    const modalInfo: any = {
      "IncorrectCode": {
        message: {
          title: "Código incorreto",
          message: "Parece que você digitou o código incorretamente"},
        },
      "IncorrectPassword": {
        message:{
          title: "Senha incorreta",
          message: "Parece que você digitou sua senha incorretamente"}
      },
      "PasswordsDontMatch": {
        message: {
          title: "Senhas diferentes",
          message: "As senhas que você digitou são diferentes, tente novamente"}
        },
      "SendEvaluations": {
        message: {
          title: "Avaliar usuários?",
          message: "Essa ação não poderá ser revertida"},
        buttons: [
          {text: "Sim", color: "green", function: async () => {if (functions) await functions[0]()}},
          {text: "Não", color: "red", function: async () => {if (functions) await functions[1]()}},
        ]
      },

      "EventDateLowerThanActual": {message: {
              title: "Data do evento menor que atual!",
              message: "A data do evento não pode ser menor que a atual"}
      },
      "default": {
        message:{
          title: "Ocorreu um erro",
          message: "Ocorreu um erro interno do servidor, sentimos muito. \nTente novamente"}
      },
      "DeleteFriendInvite": {
        message:{
          title: "Excluir convite de amizade",
          message: "Tem certeza que deseja excluir o convite de amizade"},
        buttons: [
          {text: "Sim", color: "green", function: async () => {if (functions) await functions[0]()}},
          {text: "Não", color: "red", function: async () => {if (functions) await functions[1]()}},
        ]
      },
      "DeleteFriend": {
        message:{
          title: "Excluir amigo?",
          message: "Tem certeza que deseja excluir o amigo?"},
        buttons: [
          {text: "Sim", color: "green", function: async () => {if (functions) await functions[0]()}},
          {text: "Não", color: "red", function: async () => {if (functions) await functions[1]()}},
        ]
      },
      "DeleteGameInvite": {
        message:{
          title: "Excluir convite?",
          message: "Deseja realmente excluir o convite?"},
          buttons: [
            {text: "Sim", color: "green", function: async () => {if (functions) await functions[0]()}},
            {text: "Não", color: "red", function: async () => {if (functions) await functions[1]()}},
          ]
      },
      "ConfirmGameInvite": {
        message:{
          title: "Confirmar Participação?",
          message: "Deseja confirmar sua participação nesse jogo?"},
          buttons: [
            {text: "Sim", color: "green", function: async () => {if (functions) await functions[0]()}},
            {text: "Não", color: "red", function: async () => {if (functions) await functions[1]()}},
          ]
      },
      "WrongCredentials": {
        message:{
          title: "Email ou senha incorreto",
          message: "Certifique-se que digitou seu e-mail e senha corretamente"}
      },
      "NotConfirmed": {
        message:{
          title: "Você ainda não confirmou sua conta",
          message: "Confirme sua conta para poder usufruir de todas as funcionalidades do aplicativo"},
        buttons: [
          {text: "Enviar email", color: "green", function: async () => {if (functions) await functions[0]()}},
          {text: "Usar código", color: "blue", function: async () => {if (functions) await functions[1]()}}
        ]
      },
      "Premium": {
        message:{
          title: "Você ainda não é premium!",
          message: "Somente usuários premium podem inserir mais de 5 jogos"}
      },
      "DeleteGame": {
        message:{
          title: "Excluir jogo?",
          message: "Deseja realmente excluir o jogo?"},
        buttons: [
          {text: "Sim", color: "green", function: async () => {if (functions) await functions[0]()}},
          {text: "Não", color: "red", function: async () => {if (functions) await functions[1]()}},
        ]
      },
      "Tier": {
        message: {
          title: "Você não escolheu um plano!",
          message: "Escolha um dos três planos para prosseguir"
        }
      },
      "EmailAlreadyInUse": {
        message:{
          title: "E-mail já cadastrado",
          message: "O e-mail utilizado já foi cadastrado"
        }
      }
    };

    return modalInfo[type];
  }

  return (
    <MessageModal
        visible={true}
        loading={false}
        setModal={setModal}
        message={getMessage().message}
        buttons={getMessage().buttons}
        style={style}
      />
  );
}

export default GenericMessageModal;