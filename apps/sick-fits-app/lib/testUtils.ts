import casual from 'casual';
import { PAGINATION_QUERY } from '../components/Pagination';

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  // __typename: 'Item',
  id: 'abc123',
  price: 5000,
  user: null,
  photo: {
    image: {
      publicUrlTransformed: 'dog.jpg',
    },
    altText: 'dogs are best',
  },
  name: 'dogs are best',
  description: 'dogs',
});

const fakeUser = (overrides?: Record<string, unknown>) => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
  ...overrides,
});

const fakeOrderItem = () => ({
  __typename: 'OrderItem',
  id: casual.uuid,
  image: {
    image: `${casual.word}.jpg`,
  },
  name: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2022-12-11T20:16:13.797Z',
  user: fakeUser(),
});

const fakeCartItem = (overrides?: Record<string, unknown>) => ({
  __typename: 'CartItem',
  id: 'omg123',
  quantity: 3,
  product: fakeItem(),
  user: fakeUser(),
  ...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
  store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

const makePaginationMocksFor = (length: number) => [
  {
    request: { query: PAGINATION_QUERY },
    result: {
      data: {
        productsCount: length,
      },
    },
  },
];

export {
  makePaginationMocksFor,
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
};
