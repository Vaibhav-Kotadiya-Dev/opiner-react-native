interface Imgs {
  record_button: number;
  forward_arrow: number;
  toggle_button_active: number;
  toggle_button_inactive: number;
  profile_active: number;
  profile_inactive: number;
  timeline_active: number;
  timeline_inactive: number;
  back_arrow: number;
  logo_white: number;
  rewind_left: number;
  rewind_right: number;
  pause: number;
  airplay: number;
  play: number;
  profile_bg: number;
  brain: number;
  heart: number;
  visionary: number;
  splash_logo: number;
  border_cards: number;
  logo: number;
  close: number;
  edit: number;
  plus: number;
  icon_bell: number;
  icon_clock: number;
  icon_account: number;
  icon_bell_active: number;
  icon_clock_active: number;
  icon_account_active: number;
  facebook: number;
  instagram: number;
  linkedin: number;
  twitter: number;
}

const imgs: Imgs = {
  back_arrow: require('./arrow/left/path.png'),
  forward_arrow: require('./arrow/right/path.png'),
  record_button: require('./record/start/oval.png'),
  logo_white: require('./logo_white/logo_white.png'),
  toggle_button_active: require('./toggle/active/toggleRightOn.png'),
  toggle_button_inactive: require('./toggle/inactive/loggleLeftOff.png'),
  profile_active: require('./profile/active/user.png'),
  profile_inactive: require('./profile/inactive/group2.png'),
  timeline_active: require('./timeline/active/group.png'),
  timeline_inactive: require('./timeline/inactive/group5.png'),
  rewind_left: require('./rewind_left/rewind_left.png'),
  rewind_right: require('./rewind_right/rewind_right.png'),
  pause: require('./pause/pause.png'),
  airplay: require('./airplay/airplay.png'),
  play: require('./play/play.png'),
  profile_bg: require('./profile_bg/group4.png'),
  brain: require('./brain/community-braintrusts.png'),
  heart: require('./heart/community-street.png'),
  visionary: require('./visionary/community-visionaries.png'),
  splash_logo: require('./logo-white.png'),
  border_cards: require('./border_cards/splashCardsBorder.png'),
  logo: require('./logo/logo.png'),
  close: require('./close/btnClose.png'),
  edit: require('./edit/edit3.png'),
  plus: require('./plus/plus1.png'),
  icon_bell: require('./tab_bar/bell.png'),
  icon_clock: require('./tab_bar/clock.png'),
  icon_account: require('./tab_bar/profile.png'),
  icon_bell_active: require('./tab_bar/bell-active.png'),
  icon_clock_active: require('./tab_bar/clock-active.png'),
  icon_account_active: require('./tab_bar/profile-active.png'),
  facebook: require('./social/facebook.png'),
  instagram: require('./social/instagram.png'),
  linkedin: require('./social/linkedin.png'),
  twitter: require('./social/twitter.png'),
};

export default imgs;
