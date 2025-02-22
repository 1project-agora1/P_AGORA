export interface Channel {
  token: string;
  menu_name: string;
  url: string;
  channelItems: {
    parent_menu_token: string;
    parent_submenu_token: string;
    submenu_name: string;
    url: string;
    token: string;
  }[];
}
