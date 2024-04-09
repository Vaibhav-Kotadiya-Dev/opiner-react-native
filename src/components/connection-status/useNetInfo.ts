import {useState, useLayoutEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

function useNetInfo() {
  // useState hook for setting netInfo
  const [netInfo, setNetInfo] = useState<NetInfoState>();

  useLayoutEffect(() => {
    // To get current network connection status
    NetInfo.fetch().then(connectionInfo => {
      setNetInfo(connectionInfo);
    });
    // Whenever connection status changes below event fires
    const subscription = NetInfo.addEventListener(connectionInfo => {
      setNetInfo(connectionInfo);
    });
    return subscription;
  }, []);

  // returns current network connection status
  return netInfo;
}

export default useNetInfo;
