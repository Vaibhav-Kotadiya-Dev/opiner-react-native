import {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';

import {AppState} from 'store/rootReducer';
import {getCharityList, setCharity} from 'network/OpinerApi';
import {reportToRaygun} from 'utils/Raygun';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from 'appConstants';

export interface DonationItem {
  charityName: string;
  countryId: number;
  url: string;
  charityNumber: number;
  description: string;
  notes: string;
  countryName: string;
  paidThisPeriod: number;
  charityStatus: string;
  id: number;
  isChanged: boolean;
}

interface DonationState {
  donate: boolean;
  isFetching: boolean;
  selectedOption?: DonationItem;
  donationList: Array<DonationItem>;
  confirmDonation: (charityId: number) => void;
  selectDonationOption: (item: DonationItem, donate: boolean) => void;
  fetchDonationList: () => void;
}

const cachedCharities: {
  [id: number]: DonationItem[];
} = {};

const useDonation = (responseId?: number): DonationState => {
  const {data: userData} = useSelector((state: AppState) => state.userProfile);
  const countryId = userData?.locationId || 1;
  const [donationState, setState] = useState<{
    donate: boolean;
    selectedOption?: DonationItem;
    donationList: DonationItem[];
    isFetching: boolean;
  }>({
    donate: false,
    selectedOption: undefined,
    donationList: cachedCharities[countryId] || [],
    isFetching: true,
  });

  const fetchDonationList = useCallback(() => {
    try {
      AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
        if (!token) {
          return;
        }
        getCharityList({countryId}).then(result => {
          if (result?.data && result.status === 200) {
            cachedCharities[countryId] = result.data;
            setState(existingState => ({
              ...existingState,
              donationList: result.data,
              isFetching: false,
            }));
          }
        });
      });
    } catch (error) {
      reportToRaygun(error, 'Failed while fetching charity list');
      setState(existingState => ({...existingState, isFetching: false}));
    }
  }, [countryId]);

  useEffect(() => {
    fetchDonationList();
  }, [fetchDonationList]);

  const confirmDonation = (charityId: number) => {
    setCharity({responseId, charityId});
  };

  const selectDonationOption = (item: DonationItem, donate: boolean = false) =>
    setState({
      ...donationState,
      donate,
      selectedOption: item,
    });

  return {
    ...donationState,
    selectDonationOption,
    confirmDonation,
    fetchDonationList,
  };
};

export default useDonation;
