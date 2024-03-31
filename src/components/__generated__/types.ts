import {
	IkasImage,
	IkasNavigationLink,
} from "@ikas/storefront"

export enum Position{ 
	"TOP_LEFT" = "TOP_LEFT",
	"TOP_CENTER" = "TOP_CENTER",
	"TOP_RIGHT" = "TOP_RIGHT",
	"LEFT_CENTER" = "LEFT_CENTER",
	"CENTER" = "CENTER",
	"RIGHT_CENTER" = "RIGHT_CENTER",
	"BOTTOM_CENTER" = "BOTTOM_CENTER",
	"BOTTOM_LEFT" = "BOTTOM_LEFT",
	"BOTTOM_RIGHT" = "BOTTOM_RIGHT",
};

export type Slide = { 
	left_hero: LeftFrame;
	right_hero: RightFrame;
};

export type LeftFrame = { 
	left_image: IkasImage;
	left_title: string;
	left_title_color: string;
	left_button: IkasNavigationLink;
	left_button_text: string;
	left_button_background: string;
	left_button_color: string;
	left_has_filter?: boolean;
	left_position: Position;
};

export type RightFrame = { 
	right_image: IkasImage;
	right_title: string;
	right_title_color: string;
	right_button: IkasNavigationLink;
	right_button_text: string;
	right_button_background: string;
	right_button_color: string;
	right_has_filter?: boolean;
	right_position: Position;
};

export type TitleProps = {
	title: string;
};

export type BannerProps = {
	leftFrameLink: IkasNavigationLink;
	rightFrameLink: IkasNavigationLink;
	leftFrameImage: IkasImage;
	rightFrameImage: IkasImage;
	leftFrameText: string;
	rightFrameText: string;
	leftFrameImageHasFilter?: boolean;
	rightFrameImageHasFilter?: boolean;
	leftFrameTextColor: string;
	rightFrameTextColor: string;
};

export type SliderProps = {
	slides?: Slide[];
};

