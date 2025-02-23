import {
  IkasAddressForm,
  IkasCustomer,
  IkasCustomerAddress,
  IkasLocalizedCustomerAddress,
  useStore,
} from "@ikas/storefront";
import { useEffect, useState } from "react";

export default function useAddress() {
  const store = useStore();
  const [addressForm, setAddressForm] = useState<IkasAddressForm>();
  const [isNewAddressFormVisible, setAddressFormVisibility] = useState(false);

  const isAddressFormVisible = isNewAddressFormVisible && !!addressForm;
  const addressesCount = store.customerStore?.customer?.addresses?.length ?? 0;
  const hasAddress = !!addressesCount;

  const createAddressForm = (address?: IkasLocalizedCustomerAddress) => {
    return new IkasAddressForm({
      address: address || new IkasLocalizedCustomerAddress(),
      message: {
        requiredRule: "Zorunlu alan",
        invalidRule: "Geçersiz",
        phoneRule: "Geçersiz Telefon Numarası",
      },
    });
  };

  const onAddNewAddressClick = () => {
    setAddressForm(createAddressForm());
  };

  const onAddressSave = async () => {
    if (!addressForm) return;
    const result = await addressForm.submit();
    if (!result?.isSuccess) return;
    setAddressForm(undefined);
  };

  const onAddressDelete = async (
    address: IkasCustomerAddress,
    index: number
  ) => {
    const customer = new IkasCustomer(store.customerStore.customer!);
    customer.addresses?.splice(index, 1);
    const success = await store.customerStore.saveCustomer(customer);
  };

  const onAddresEdit = (address: IkasCustomerAddress, index: number) => {
    const customerAddress = new IkasLocalizedCustomerAddress(address);
    setAddressForm(createAddressForm(customerAddress));
  };

  const onAddressFormClose = () => {
    setAddressForm(undefined);
  };

  useEffect(() => {
    if (addressForm) {
      setAddressFormVisibility(true);
    } else {
      setAddressFormVisibility(false);
    }
  }, [addressForm]);

  useEffect(() => {
    if (!addressesCount) setAddressForm(createAddressForm());
  }, [addressesCount]);

  return {
    isAddressFormVisible,
    addressForm,
    addressesCount,
    hasAddress,
    onAddNewAddressClick,
    onAddressFormClose,
    onAddressDelete,
    onAddresEdit,
    onAddressSave,
  };
}
