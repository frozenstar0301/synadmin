export interface ImageItem {
    id: string;
    url: string;
    name?: string;
}

export interface FontItem {
    id: string;
    url: string;
    name: string;
}

export interface Screen {
    id: string;
    background_image_id: string | null;
    button_image_id: string | null;
    subpanel_image_id: string | null;
    email_image_id: string | null;
    password_image_id: string | null;
    checkbox_image_id: string | null;
    checkbox_background_color: string;
    font_id: string | null;
}

export interface SignUpScreen {
    id: string;
    background_image_id: string | null;
    button_image_id: string | null;
    subpanel_image_id: string | null;
    username_image_id: string | null;
    username_border_color: string | null;
    email_image_id: string | null;
    email_border_color: string | null;
    password_image_id: string | null;
    password_border_color: string | null;
    password_confirm_image_id: string | null;
    password_confirm_border_color: string | null;
    checkbox_image_id: string | null;
    checkbox_background_color: string;
    font_id: string | null;
}

export interface ForgetPwScreen {
    id: string;
    background_image_id: string | null;
    button_image_id: string | null;
    subpanel_image_id: string | null;
    email_image_id: string | null;
    email_border_color: string | null;
    font_id: string | null;
}

export interface CheckInScreen {
    id: string;
    background1_image_id: string | null;
    background2_image_id: string | null;
    button_image_id: string | null;
    card_border_color: string | null;
    card_content_bg_image_id: string | null;
    card_title_bg_image_id: string | null;
    gem_image_id: string | null;
    get_image_id: string | null;
    mark_image_id: string | null;
    subpanel_image_id: string | null;
    card_icon_image_id: string | null;
    font_id: string | null;
}

export type ElementType = 'background' | 'signin' | 'signup';  