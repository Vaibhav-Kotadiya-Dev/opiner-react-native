import {ICountry} from 'network/data/Country';
import {ItemType} from 'react-native-dropdown-picker';

export const timezoneOptions = [
  {value: 'UTC-11', label: '(UTC-11:00) Coordinated Universal Time-11'},
  {value: 'Aleutian Standard Time', label: '(UTC-10:00) Aleutian Islands'},
  {value: 'Hawaiian Standard Time', label: '(UTC-10:00) Hawaii'},
  {value: 'Marquesas Standard Time', label: '(UTC-09:30) Marquesas Islands'},
  {value: 'Alaskan Standard Time', label: '(UTC-09:00) Alaska'},
  {value: 'UTC-09', label: '(UTC-09:00) Coordinated Universal Time-09'},
  {
    value: 'Pacific Standard Time (Mexico)',
    label: '(UTC-08:00) Baja California',
  },
  {value: 'UTC-08', label: '(UTC-08:00) Coordinated Universal Time-08'},
  {
    value: 'Pacific Standard Time',
    label: '(UTC-08:00) Pacific Time (US &amp; Canada)',
  },
  {value: 'US Mountain Standard Time', label: '(UTC-07:00) Arizona'},
  {
    value: 'Mountain Standard Time (Mexico)',
    label: '(UTC-07:00) Chihuahua, La Paz, Mazatlan',
  },
  {
    value: 'Mountain Standard Time',
    label: '(UTC-07:00) Mountain Time (US &amp; Canada)',
  },
  {value: 'Yukon Standard Time', label: '(UTC-07:00) Yukon'},
  {
    value: 'Central America Standard Time',
    label: '(UTC-06:00) Central America',
  },
  {
    value: 'Central Standard Time',
    label: '(UTC-06:00) Central Time (US &amp; Canada)',
  },
  {value: 'Easter Island Standard Time', label: '(UTC-06:00) Easter Island'},
  {
    value: 'Central Standard Time (Mexico)',
    label: '(UTC-06:00) Guadalajara, Mexico City, Monterrey',
  },
  {value: 'Canada Central Standard Time', label: '(UTC-06:00) Saskatchewan'},
  {
    value: 'SA Pacific Standard Time',
    label: '(UTC-05:00) Bogota, Lima, Quito, Rio Branco',
  },
  {value: 'Eastern Standard Time (Mexico)', label: '(UTC-05:00) Chetumal'},
  {
    value: 'Eastern Standard Time',
    label: '(UTC-05:00) Eastern Time (US &amp; Canada)',
  },
  {value: 'Haiti Standard Time', label: '(UTC-05:00) Haiti'},
  {value: 'Cuba Standard Time', label: '(UTC-05:00) Havana'},
  {value: 'US Eastern Standard Time', label: '(UTC-05:00) Indiana (East)'},
  {
    value: 'Turks And Caicos Standard Time',
    label: '(UTC-05:00) Turks and Caicos',
  },
  {value: 'Paraguay Standard Time', label: '(UTC-04:00) Asuncion'},
  {
    value: 'Atlantic Standard Time',
    label: '(UTC-04:00) Atlantic Time (Canada)',
  },
  {value: 'Venezuela Standard Time', label: '(UTC-04:00) Caracas'},
  {value: 'Central Brazilian Standard Time', label: '(UTC-04:00) Cuiaba'},
  {
    value: 'SA Western Standard Time',
    label: '(UTC-04:00) Georgetown, La Paz, Manaus, San Juan',
  },
  {value: 'Pacific SA Standard Time', label: '(UTC-04:00) Santiago'},
  {value: 'Newfoundland Standard Time', label: '(UTC-03:30) Newfoundland'},
  {value: 'Tocantins Standard Time', label: '(UTC-03:00) Araguaina'},
  {value: 'E. South America Standard Time', label: '(UTC-03:00) Brasilia'},
  {value: 'SA Eastern Standard Time', label: '(UTC-03:00) Cayenne, Fortaleza'},
  {value: 'Argentina Standard Time', label: '(UTC-03:00) City of Buenos Aires'},
  {value: 'Greenland Standard Time', label: '(UTC-03:00) Greenland'},
  {value: 'Montevideo Standard Time', label: '(UTC-03:00) Montevideo'},
  {value: 'Magallanes Standard Time', label: '(UTC-03:00) Punta Arenas'},
  {
    value: 'Saint Pierre Standard Time',
    label: '(UTC-03:00) Saint Pierre and Miquelon',
  },
  {value: 'Bahia Standard Time', label: '(UTC-03:00) Salvador'},
  {value: 'UTC-02', label: '(UTC-02:00) Coordinated Universal Time-02'},
  {
    value: 'Mid-Atlantic Standard Time',
    label: '(UTC-02:00) Mid-Atlantic - Old',
  },
  {value: 'Azores Standard Time', label: '(UTC-01:00) Azores'},
  {value: 'Cape Verde Standard Time', label: '(UTC-01:00) Cabo Verde Is.'},
  {value: 'UTC', label: '(UTC) Coordinated Universal Time'},
  {
    value: 'GMT Standard Time',
    label: '(UTC+00:00) Dublin, Edinburgh, Lisbon, London',
  },
  {
    value: 'Greenwich Standard Time',
    label: '(UTC+00:00) Monrovia, Reykjavik',
  },
  {value: 'Sao Tome Standard Time', label: '(UTC+00:00) Sao Tome'},
  {value: 'Morocco Standard Time', label: '(UTC+01:00) Casablanca'},
  {
    value: 'W. Europe Standard Time',
    label: '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  },
  {
    value: 'Central Europe Standard Time',
    label: '(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  },
  {
    value: 'Romance Standard Time',
    label: '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris',
  },
  {
    value: 'Central European Standard Time',
    label: '(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
  },
  {
    value: 'W. Central Africa Standard Time',
    label: '(UTC+01:00) West Central Africa',
  },
  {value: 'Jordan Standard Time', label: '(UTC+02:00) Amman'},
  {value: 'GTB Standard Time', label: '(UTC+02:00) Athens, Bucharest'},
  {value: 'Middle East Standard Time', label: '(UTC+02:00) Beirut'},
  {value: 'Egypt Standard Time', label: '(UTC+02:00) Cairo'},
  {value: 'E. Europe Standard Time', label: '(UTC+02:00) Chisinau'},
  {value: 'Syria Standard Time', label: '(UTC+02:00) Damascus'},
  {value: 'West Bank Standard Time', label: '(UTC+02:00) Gaza, Hebron'},
  {
    value: 'South Africa Standard Time',
    label: '(UTC+02:00) Harare, Pretoria',
  },
  {
    value: 'FLE Standard Time',
    label: '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
  },
  {value: 'Israel Standard Time', label: '(UTC+02:00) Jerusalem'},
  {value: 'South Sudan Standard Time', label: '(UTC+02:00) Juba'},
  {value: 'Kaliningrad Standard Time', label: '(UTC+02:00) Kaliningrad'},
  {value: 'Sudan Standard Time', label: '(UTC+02:00) Khartoum'},
  {value: 'Libya Standard Time', label: '(UTC+02:00) Tripoli'},
  {value: 'Namibia Standard Time', label: '(UTC+02:00) Windhoek'},
  {value: 'Arabic Standard Time', label: '(UTC+03:00) Baghdad'},
  {value: 'Turkey Standard Time', label: '(UTC+03:00) Istanbul'},
  {value: 'Arab Standard Time', label: '(UTC+03:00) Kuwait, Riyadh'},
  {value: 'Belarus Standard Time', label: '(UTC+03:00) Minsk'},
  {
    value: 'Russian Standard Time',
    label: '(UTC+03:00) Moscow, St. Petersburg',
  },
  {value: 'E. Africa Standard Time', label: '(UTC+03:00) Nairobi'},
  {value: 'Volgograd Standard Time', label: '(UTC+03:00) Volgograd'},
  {value: 'Iran Standard Time', label: '(UTC+03:30) Tehran'},
  {value: 'Arabian Standard Time', label: '(UTC+04:00) Abu Dhabi, Muscat'},
  {
    value: 'Astrakhan Standard Time',
    label: '(UTC+04:00) Astrakhan, Ulyanovsk',
  },
  {value: 'Azerbaijan Standard Time', label: '(UTC+04:00) Baku'},
  {value: 'Russia Time Zone 3', label: '(UTC+04:00) Izhevsk, Samara'},
  {value: 'Mauritius Standard Time', label: '(UTC+04:00) Port Louis'},
  {value: 'Saratov Standard Time', label: '(UTC+04:00) Saratov'},
  {value: 'Georgian Standard Time', label: '(UTC+04:00) Tbilisi'},
  {value: 'Caucasus Standard Time', label: '(UTC+04:00) Yerevan'},
  {value: 'Afghanistan Standard Time', label: '(UTC+04:30) Kabul'},
  {
    value: 'West Asia Standard Time',
    label: '(UTC+05:00) Ashgabat, Tashkent',
  },
  {value: 'Ekaterinburg Standard Time', label: '(UTC+05:00) Ekaterinburg'},
  {
    value: 'Pakistan Standard Time',
    label: '(UTC+05:00) Islamabad, Karachi',
  },
  {value: 'Qyzylorda Standard Time', label: '(UTC+05:00) Qyzylorda'},
  {
    value: 'India Standard Time',
    label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
  },
  {
    value: 'Sri Lanka Standard Time',
    label: '(UTC+05:30) Sri Jayawardenepura',
  },
  {value: 'Nepal Standard Time', label: '(UTC+05:45) Kathmandu'},
  {value: 'Central Asia Standard Time', label: '(UTC+06:00) Astana'},
  {value: 'Bangladesh Standard Time', label: '(UTC+06:00) Dhaka'},
  {value: 'Omsk Standard Time', label: '(UTC+06:00) Omsk'},
  {value: 'Myanmar Standard Time', label: '(UTC+06:30) Yangon (Rangoon)'},
  {
    value: 'SE Asia Standard Time',
    label: '(UTC+07:00) Bangkok, Hanoi, Jakarta',
  },
  {
    value: 'Altai Standard Time',
    label: '(UTC+07:00) Barnaul, Gorno-Altaysk',
  },
  {value: 'W. Mongolia Standard Time', label: '(UTC+07:00) Hovd'},
  {value: 'North Asia Standard Time', label: '(UTC+07:00) Krasnoyarsk'},
  {
    value: 'N. Central Asia Standard Time',
    label: '(UTC+07:00) Novosibirsk',
  },
  {value: 'Tomsk Standard Time', label: '(UTC+07:00) Tomsk'},
  {
    value: 'China Standard Time',
    label: '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
  },
  {value: 'North Asia East Standard Time', label: '(UTC+08:00) Irkutsk'},
  {
    value: 'Singapore Standard Time',
    label: '(UTC+08:00) Kuala Lumpur, Singapore',
  },
  {value: 'W. Australia Standard Time', label: '(UTC+08:00) Perth'},
  {value: 'Taipei Standard Time', label: '(UTC+08:00) Taipei'},
  {value: 'Ulaanbaatar Standard Time', label: '(UTC+08:00) Ulaanbaatar'},
  {value: 'Aus Central W. Standard Time', label: '(UTC+08:45) Eucla'},
  {value: 'Transbaikal Standard Time', label: '(UTC+09:00) Chita'},
  {
    value: 'Tokyo Standard Time',
    label: '(UTC+09:00) Osaka, Sapporo, Tokyo',
  },
  {value: 'North Korea Standard Time', label: '(UTC+09:00) Pyongyang'},
  {value: 'Korea Standard Time', label: '(UTC+09:00) Seoul'},
  {value: 'Yakutsk Standard Time', label: '(UTC+09:00) Yakutsk'},
  {value: 'Cen. Australia Standard Time', label: '(UTC+09:30) Adelaide'},
  {value: 'AUS Central Standard Time', label: '(UTC+09:30) Darwin'},
  {value: 'E. Australia Standard Time', label: '(UTC+10:00) Brisbane'},
  {
    value: 'AUS Eastern Standard Time',
    label: '(UTC+10:00) Canberra, Melbourne, Sydney',
  },
  {
    value: 'West Pacific Standard Time',
    label: '(UTC+10:00) Guam, Port Moresby',
  },
  {value: 'Tasmania Standard Time', label: '(UTC+10:00) Hobart'},
  {value: 'Vladivostok Standard Time', label: '(UTC+10:00) Vladivostok'},
  {
    value: 'Lord Howe Standard Time',
    label: '(UTC+10:30) Lord Howe Island',
  },
  {
    value: 'Bougainville Standard Time',
    label: '(UTC+11:00) Bougainville Island',
  },
  {value: 'Russia Time Zone 10', label: '(UTC+11:00) Chokurdakh'},
  {value: 'Magadan Standard Time', label: '(UTC+11:00) Magadan'},
  {value: 'Norfolk Standard Time', label: '(UTC+11:00) Norfolk Island'},
  {value: 'Sakhalin Standard Time', label: '(UTC+11:00) Sakhalin'},
  {
    value: 'Central Pacific Standard Time',
    label: '(UTC+11:00) Solomon Is., New Caledonia',
  },
  {
    value: 'Russia Time Zone 11',
    label: '(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky',
  },
  {
    value: 'New Zealand Standard Time',
    label: '(UTC+12:00) Auckland, Wellington',
  },
  {
    value: 'UTC+12',
    label: '(UTC+12:00) Coordinated Universal Time+12',
  },
  {value: 'Fiji Standard Time', label: '(UTC+12:00) Fiji'},
  {
    value: 'Kamchatka Standard Time',
    label: '(UTC+12:00) Petropavlovsk-Kamchatsky - Old',
  },
  {
    value: 'Chatham Islands Standard Time',
    label: '(UTC+12:45) Chatham Islands',
  },
  {
    value: 'UTC+13',
    label: '(UTC+13:00) Coordinated Universal Time+13',
  },
  {value: 'Tonga Standard Time', label: '(UTC+13:00) Nuku&#x27;alofa'},
  {value: 'Samoa Standard Time', label: '(UTC+13:00) Samoa'},
  {
    value: 'Line Islands Standard Time',
    label: '(UTC+14:00) Kiritimati Island',
  },
];

export const getCountriesDropdownOptions = (list: ICountry[]) => {
  return list.reduce(
    (acc: ItemType<string | number>[], current: ICountry, index, data) => {
      // Already in the list
      if (acc.findIndex(item => item.value === current.id) !== -1) {
        return acc;
      }

      // Find child locations of the current one
      const children = data
        .filter(item => item.countryId === current.countryId)
        .map(item => ({
          parent: -current.countryId,
          label: item.locationName,
          value: item.id,
        }));
      if (children.length) {
        // Create a parent disabled item for group label
        const parent = {
          label: current.countryName,
          value: -current.countryId,
          disabled: true,
        };
        acc = acc.concat([parent, ...children]);
      } else {
        acc.push({
          label: current.locationName,
          value: current.id,
        });
      }
      return acc;
    },
    [],
  );
};

export const birthYearOptions = Array.from(Array(100)).map((item, index) => {
  const year = new Date().getFullYear() - index - 1;
  return {
    label: year.toString(),
    value: year,
  };
});

export const birthMonthOptions = [
  {label: 'January', value: 1},
  {label: 'February', value: 2},
  {label: 'March', value: 3},
  {label: 'April', value: 4},
  {label: 'May', value: 5},
  {label: 'June', value: 6},
  {label: 'July', value: 7},
  {label: 'August', value: 8},
  {label: 'September', value: 9},
  {label: 'October', value: 10},
  {label: 'November', value: 11},
  {label: 'December', value: 12},
];
