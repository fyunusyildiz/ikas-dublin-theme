import dynamic from "next/dynamic";
import { IkasEditorComponentLoader } from "@ikas/storefront";


const Component0 = dynamic(() => import("../title"), { loading: () => <IkasEditorComponentLoader /> });
const Component1 = dynamic(() => import("../banner"), { loading: () => <IkasEditorComponentLoader /> });
const Component2 = dynamic(() => import("../slider"), { loading: () => <IkasEditorComponentLoader /> });
const Component3 = dynamic(() => import("../announcement"), { loading: () => <IkasEditorComponentLoader /> });
const Component4 = dynamic(() => import("../category-banner-with-two"), { loading: () => <IkasEditorComponentLoader /> });
const Component5 = dynamic(() => import("../category-banner-with-three"), { loading: () => <IkasEditorComponentLoader /> });
const Component6 = dynamic(() => import("../category-banner-with-four"), { loading: () => <IkasEditorComponentLoader /> });
const Component7 = dynamic(() => import("../header"), { loading: () => <IkasEditorComponentLoader /> });
const Component8 = dynamic(() => import("../product-detail"), { loading: () => <IkasEditorComponentLoader /> });


const Components = {
  "471dfb8e-49ae-4974-aa19-8029a5671040": Component0,"b2a03d8a-6dc6-4be3-82c2-544492395fb7": Component1,"e26b43b6-b0fe-40af-a56a-9455fd0b6700": Component2,"f7123d60-af79-47a2-bec5-4540c1d4a6b7": Component3,"5841dec2-136f-4c75-a3cf-6a38ac628787": Component4,"0c47c4af-6036-465b-9491-f55ad7efb527": Component5,"8624b237-ba5f-4e4c-9d0e-36cdc1a1667e": Component6,"06d23529-6a32-4794-aad9-2bcc1a4f4952": Component7,"86c4d711-8440-4b54-826d-0f5536f2eb17": Component8
};

export default Components;