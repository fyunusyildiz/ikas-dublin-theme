import {
	IkasImage,
	IkasNavigationLink,
	IkasSlider,
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

export enum TextPosition{ 
	"LEFT" = "LEFT",
	"CENTER" = "CENTER",
	"RIGHT" = "RIGHT",
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

export type AnnouncementProps = {
	text: string;
	link: IkasNavigationLink;
	backgroundColor: string;
	textColor: string;
	textAlign: TextPosition;
};

export type CategoryBannerWithTwoProps = {
	firstCategoryLink: IkasNavigationLink;
	firstCategoryImage: IkasImage;
	firstCategoryText: string;
	firstCategoryTextBackground: string;
	firstCategoryTextColor: string;
	firstCategoryHasFilter?: boolean;
	secondCategoryLink: IkasNavigationLink;
	secondCategoryImage: IkasImage;
	secondCategoryText: string;
	secondCategoryTextBackground: string;
	secondCategoryTextColor: string;
	secondCategoryHasFilter?: boolean;
	hasMarginTop?: boolean;
};

export type CategoryBannerWithThreeProps = {
	firstCategoryLink: IkasNavigationLink;
	firstCategoryImage: IkasImage;
	firstCategoryText: string;
	firstCategoryTextBackground: string;
	firstCategoryTextColor: string;
	firstCategoryHasFilter?: boolean;
	secondCategoryLink: IkasNavigationLink;
	secondCategoryImage: IkasImage;
	secondCategoryText: string;
	secondCategoryTextBackground: string;
	secondCategoryTextColor: string;
	secondCategoryHasFilter?: boolean;
	thirdCategoryLink: IkasNavigationLink;
	thirdCategoryImage: IkasImage;
	thirdCategoryText: string;
	thirdCategoryTextBackground: string;
	thirdCategoryTextColor: string;
	thirdCategoryHasFilter?: boolean;
	hasMarginTop?: boolean;
};

export type CategoryBannerWithFourProps = {
	firstCategoryLink: IkasNavigationLink;
	firstCategoryImage: IkasImage;
	firstCategoryText: string;
	firstCategoryTextBackground: string;
	firstCategoryTextColor: string;
	firstCategoryHasFilter?: boolean;
	secondCategoryLink: IkasNavigationLink;
	secondCategoryImage: IkasImage;
	secondCategoryText: string;
	secondCategoryTextBackground: string;
	secondCategoryTextColor: string;
	secondCategoryHasFilter?: boolean;
	thirdCategoryLink: IkasNavigationLink;
	thirdCategoryImage: IkasImage;
	thirdCategoryText: string;
	thirdCategoryTextBackground: string;
	thirdCategoryTextColor: string;
	thirdCategoryHasFilter?: boolean;
	fourthCategoryLink: IkasNavigationLink;
	fourthCategoryImage: IkasImage;
	fourthCategoryText: string;
	fourthCategoryTextBackground: string;
	fourthCategoryTextColor: string;
	fourthCategoryHasFilter?: boolean;
	hasMarginTop?: boolean;
};

export type HeaderProps = {
	hasAnnouncement?: boolean;
	announcementText: string;
	noTransparentHeader?: boolean;
	headerBackgroundColor: string;
	announcementBgColor: string;
	announcementTextColor: string;
	announcementTextAlign: TextPosition;
	announcementLink: IkasNavigationLink;
	isCentered?: boolean;
	logo: IkasImage;
	transparentHeaderLogo?: IkasImage;
	logoMaxWidth: IkasSlider;
	logoMaxHeight: IkasSlider;
	logoMaxWidthMobile: IkasSlider;
	logoMaxHeightMobile: IkasSlider;
	links: IkasNavigationLink[];
	headerLinkColor: string;
	headerSublinkColor: string;
	headerLinkHoverBg: string;
	headerLinkHoverColor: string;
};

