export interface ChannelItemCreateRequest {
  parent_menu_token: string;
  parent_submenu_token?: string;
  submenu_name: string;
  url: string;
}

export interface ChannelCreateRequest {
  menu_name: string;
  url: string;
}
