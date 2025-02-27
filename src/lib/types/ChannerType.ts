export interface Channel {
    token: string; // 채널 토큰(고유값)
    menu_name: string; // 메뉴명
    url: string; // 채널의 url
    channelItems: {
        // 해당 채널의 아이템 ex. 게일 채널 --> 롤, 배그 등
        parent_menu_token: string; // 부모 메뉴 토큰
        parent_submenu_token: string; // item 내에서 item의 서브 item (ex. 롤 -> 플래티넘, 실버 )
        submenu_name: string; // 서브 메뉴명 (롤, 배그 등)
        url: string; // 서브 메뉴의 url
        token: string; // 서브 메뉴의 토큰
    }[];
}
