import { observer } from "mobx-react-lite";

import Header from "src/components/account/components/header";
import Button from "src/components/components/button";
import Loading from "../components/loading";
import Order from "./order";
import useOrders from "./useOrders";

import * as S from "./style";

const Orders = () => {
  const { isPending, orders } = useOrders();

  const headerTitle = `Siparişlerim (${orders.length})`;

  return (
    <div>
      <Header title={headerTitle} />
      {isPending && <Loading>Yükleniyor</Loading>}
      {!isPending && !!orders.length && (
        <S.Orders>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </S.Orders>
      )}
      {!isPending && orders.length === 0 && (
        <S.NoOrders>
          <S.NoOrdersText>Siparişiniz bulunmamaktadır.</S.NoOrdersText>
          <Button anchor href="/">
            Alışverişe Başla
          </Button>
        </S.NoOrders>
      )}
    </div>
  );
};

export default observer(Orders);
