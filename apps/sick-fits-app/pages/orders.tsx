import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

import { ErrorMessage } from '../components/ErrorMessage';
import { OrderItemStyles } from '../components/styles/OrderItemStyles';
import { formatMoney } from '../lib/formatMoney';

const USER_ORDER_QUERY = gql`
  query USER_ORDER_QUERY {
    orders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInAnOrder = (order: any) =>
  order.items.reduce((tally: number, item: any) => tally + item.quantity, 0);

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { orders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders ({orders.length})</title>
      </Head>
      <h2>You have {orders.length} orders!</h2>
      <OrderUl>
        {orders.map((order: any) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <div className="order-meta">
                <p>{countItemsInAnOrder(order)} Items</p>
                <p>
                  {order.items.length} Product
                  {order.items.length === 1 ? '' : 's'}
                </p>
                <p>{formatMoney(order.total)}</p>
              </div>
              <div className="images">
                {order.items.map((item: any) => (
                  <img
                    key={item.id}
                    src={item.photo?.image?.publicUrlTransformed}
                    alt={item.name}
                  />
                ))}
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
