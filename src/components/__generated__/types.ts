import {
	IkasNavigationLink,
	IkasImage,
} from "@ikas/storefront"

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

