import React, { createContext, ReactNode, useContext } from 'react';
import storage from '@react-native-firebase/storage';

import api from '../services/api';
import { useAuth } from './Auth';
import { PhotoType } from '../utils/types';

type RequestData = {
  get: (route: string, setLoading: Function) => any;
  put: (route: string, setLoading: Function, data: any) => any;
  post: (route: string, setLoading: Function, data: any) => any;
  destroy: (route: string, callback: Function, setLoading?: Function) => any;
  uploadPhoto: (route: string, setLoading: Function, photo: PhotoType | undefined) => any;
}

type RequestProviderProps = {
  children: ReactNode;
}

const RequestContext = createContext({} as RequestData);

export const RequestProvider: React.FC<RequestProviderProps> = ({children}) =>
{
  const {user} = useAuth();

  async function get(route: string, setLoading: Function)
  {
      setLoading(true);

      if (!user) {
        setLoading(false);
        throw new Error("User not found");
      }

      const result = await api.get(route, {
        headers: {auth_token: user.auth_token}
      });

      if (!result || !result.data) {
        setLoading(false);
        throw new Error("No data");
      }

      setLoading(false);
      return result.data;
  }

  async function post(route: string, setLoading: Function, data: any)
  {
    setLoading(true);

    if (!user) {
      setLoading(false);
      throw new Error("User not found");
    }

    await api.post(route, data, {headers: {auth_token: user.auth_token}});

    setLoading(false);
  }

  async function put(route: string, setLoading: Function, data: any)
  {
    setLoading(true);

    if (!user) {
      setLoading(false);
      throw new Error("User not found");
    }

    await api.put(route, data, {headers: {auth_token: user.auth_token}});

    setLoading(false);
  }

  async function destroy(route: string, callback: Function, setLoading?: Function)
  {
    if (setLoading) setLoading(true);

    if (!user) {
      throw new Error("User not found");
    }

    await api.delete(route, {headers: {auth_token: user.auth_token}});

    if (setLoading) setLoading(false);
    callback();
  }

  async function uploadPhoto(route: string, setLoading: Function, photo: PhotoType | undefined)
  {
      if (!photo) {
        throw new Error("Photo not found");
      }

      setLoading(true);

      if (!user) {
        throw new Error("User not found");
      }

      const reference = storage().ref(route);

      try {
        await reference.delete();
      } catch (err) {}

      if (!photo || !photo.uri) return;

      const pathToFile = photo.uri;

      await reference.putFile(pathToFile);

      return await reference.getDownloadURL();
  }

  return (
    <RequestContext.Provider value={{
      get,
      put,
      post,
      destroy,
      uploadPhoto
    }}>
      {children}
    </RequestContext.Provider>
  );

}

export const useRequest = () => {
  return useContext(RequestContext);
};