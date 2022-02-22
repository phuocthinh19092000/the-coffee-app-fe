import OrderIcon from '../share/assets/vector/OrderVector.svg';
import ReportIcon from '../share/assets/vector/ReportVector.svg';
import ItemIcon from '../share/assets/vector/MenuVector.svg';
import AccountIcon from '../share/assets/vector/AccountIcon.svg';

export const TabName = {
  STAFF: {
    ORDER: 'Orders',
    ITEM: 'Items',
    REPORT: 'Reports',
  },
  ADMIN: {
    ACCOUNT: 'Accounts',
    REPORT: 'Reports',
  },
};

export const TabIcon = {
  STAFF: {
    ORDER_ICON: OrderIcon,
    ITEM_ICON: ReportIcon,
    REPORT_ICON: ItemIcon,
  },
  ADMIN: {
    ACCOUNT_ICON: AccountIcon,
    REPORT_ICON: ItemIcon,
  },
};
