import { useIntl } from 'react-intl'
import { useMetamask } from '../contexts/Metamask.context'
import { ChatSvgIcon, CommentSvgIcon, NotificationSvgIcon, StarSvgIcon, UserSvgIcon, WalletSvgIcon } from '../components/icons'
import { IAttribute, ICollectionTheme, IFilterOption, IMenu, IPaymentToken, ISubMenu, ITab } from '../types/types'

import DocumentIcon from '../assets/svg/document.svg'
import StarIcon from '../assets/svg/star.svg'
import ChartIcon from '../assets/svg/chart.svg'
import UnlockIcon from '../assets/svg/unlock.svg'
import InfoTriangleIcon from '../assets/svg/info_triangle.svg'
import DAIEthereumIcon from '../assets/svg/tokens/dai_ethereum.svg'
import USDCEthereumIcon from '../assets/svg/tokens/usdc_ethereum.svg'
import { ContainedIcon, CoveredIcon, PaddedIcon, } from '../assets/svg/collection_theme'

const constants = () => {
  const intl = useIntl()
  const { chain } = useMetamask()

  const MARKETPLACE_MENUS: ISubMenu[] = [
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.all_nfts' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.art' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.collectibles' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.domain_names' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.music' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.photography' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.sports' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.trading_cards' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.utility' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.browse.by.category.section.category.virtual_worlds' }),
      url: '#',
    },
  ]

  const MY_ACCOUNT_MENUS: ISubMenu[] = [
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.profile' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.favorites' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.watchlist' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.my_collections' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.setting' }),
      url: '#',
    },
  ]

  const RESOURCES_MENUS: ISubMenu[] = [
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.learn' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.help_center' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.platform_studies' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.partners' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.taxes' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.blog' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.docs' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.newsletter' }),
      url: '#',
    },
  ]

  const COMPANY_MENUS: ISubMenu[] = [
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.about' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.careers' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.ventures' }),
      url: '#',
    },
    {
      name: intl.formatMessage({ id: 'page.home.footer.section.label.grants' }),
      url: '#',
    },
  ]

  const MENUS: IMenu[] = [
    {
      title: intl.formatMessage({ 'id': 'page.home.footer.section.label.marketplace' }),
      menus: MARKETPLACE_MENUS,
    },
    {
      title: intl.formatMessage({ 'id': 'page.home.footer.section.label.my_account' }),
      menus: MY_ACCOUNT_MENUS,
    },
    {
      title: intl.formatMessage({ 'id': 'page.home.footer.section.label.resources' }),
      menus: RESOURCES_MENUS,
    },
    {
      title: intl.formatMessage({ 'id': 'page.home.footer.section.label.company' }),
      menus: COMPANY_MENUS,
    },
  ]

  const STATUS_OPTIONS: IFilterOption[] = [
    {
      label: intl.formatMessage({'id': 'page.assets.filter.sidebar.status.buy_now'}),
      value: 'buy_now',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.sidebar.status.on_auction'}),
      value: 'on_auction',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.sidebar.status.new'}),
      value: 'new',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.sidebar.status.has_offers'}),
      value: 'has_offers',
    },
  ]

  const QUANTITY_OPTIONS: IFilterOption[] = [
    {
      label: intl.formatMessage({'id': 'page.assets.filter.sidebar.quantity.all_items'}),
      value: 'all_items',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.sidebar.quantity.single_items'}),
      value: 'single_items',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.sidebar.quantity.bundle'}),
      value: 'bundle',
    },
  ]

  const SORT_BY: IFilterOption[] = [
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.recently_listed'}),
      value: 'recently_listed',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.recently_created'}),
      value: 'recently_created',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.recently_sold'}),
      value: 'recently_sold',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.recently_received'}),
      value: 'recently_received',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.ending_soon'}),
      value: 'ending_soon',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.price_low_to_high'}),
      value: 'price_low_to_high',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.price_high_to_low'}),
      value: 'price_high_to_low',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.highest_last_sale'}),
      value: 'highest_last_sale',
    },
    {
      label: intl.formatMessage({'id': 'page.assets.filter.navbar.sort_by.oldest'}),
      value: 'oldest',
    },
  ]

  const ATTRIBUTS: IAttribute[] = [
    {
      name: intl.formatMessage({'id': 'page.nft.creation.attribute.properties.name'}),
      description: intl.formatMessage({'id': 'page.nft.creation.attribute.properties.desc'}),
      image: DocumentIcon,
      slug: 'properties',

    },
    {
      name: intl.formatMessage({'id': 'page.nft.creation.attribute.levels.name'}),
      description: intl.formatMessage({'id': 'page.nft.creation.attribute.levels.desc'}),
      image: StarIcon,
      slug: 'levels',
    },
    {
      name: intl.formatMessage({'id': 'page.nft.creation.attribute.stats.name'}),
      description: intl.formatMessage({'id': 'page.nft.creation.attribute.stats.desc'}),
      image: ChartIcon,
      slug: 'stats',
    },
  ]
  
  const CONTENT_STATUSES: IAttribute[] = [
    {
      name: intl.formatMessage({'id': 'page.nft.creation.attribute.unlockable.name'}),
      description: intl.formatMessage({'id': 'page.nft.creation.attribute.unlockable.desc'}),
      image: UnlockIcon,
      slug: 'unlockable',
    },
    {
      name: intl.formatMessage({'id': 'page.nft.creation.attribute.explicit.name'}),
      description: intl.formatMessage({'id': 'page.nft.creation.attribute.explicit.desc'}),
      image: InfoTriangleIcon,
      info: true,
      slug: 'explicit',
    },
  ]

  const PAYMENT_TOKENS: IPaymentToken[] = [
    {
      symbol: 'DAI',
      chain: chain?.name,
      icon: DAIEthereumIcon,
      removable: true,
    },
    {
      symbol: 'USDC',
      chain: chain?.name,
      icon: USDCEthereumIcon,
      removable: true,
    },
  ]

  const COLLECTION_THEMES: ICollectionTheme[] = [
    {
      icon: PaddedIcon,
      label: intl.formatMessage({'id': 'page.collection.creation.theme.padded.label'}),
      description: intl.formatMessage({'id': 'page.collection.creation.theme.padded.desc'}),
      slug: 'padded',
    },
    {
      icon: ContainedIcon,
      label: intl.formatMessage({'id': 'page.collection.creation.theme.contained.label'}),
      description: intl.formatMessage({'id': 'page.collection.creation.theme.contained.desc'}),
      slug: 'contained',
    },
    {
      icon: CoveredIcon,
      label: intl.formatMessage({'id': 'page.collection.creation.theme.covered.label'}),
      description: intl.formatMessage({'id': 'page.collection.creation.theme.covered.desc'}),
      slug: 'covered',
    },
  ]

  const HOME_FEATURED_TABS: ITab[] = [
    {
      name: intl.formatMessage({ id: 'page.home.featured.tabs.section.label.trending' }),
      slug: 'trending',
    },
    {
      name: intl.formatMessage({ id: 'page.home.featured.tabs.section.label.top_projects' }),
      slug: 'top_projects',
    },
    {
      name: intl.formatMessage({ id: 'page.home.featured.tabs.section.label.top_activities' }),
      slug: 'top_activities',
    },
    {
      name: intl.formatMessage({ id: 'page.home.featured.tabs.section.label.coming_projects' }),
      slug: 'coming_projects',
    },
    {
      name: intl.formatMessage({ id: 'page.home.featured.tabs.section.label.featured_projects' }),
      slug: 'featured_projects',
    },
  ]

  const PROFILE_TABS: ITab[] = [
    {
      name: intl.formatMessage({ id: 'page.profile.tabs.collected' }),
      slug: 'collected',
    },
    {
      name: intl.formatMessage({ id: 'page.profile.tabs.created' }),
      slug: 'created',
    },
    {
      name: intl.formatMessage({ id: 'page.profile.tabs.favorited' }),
      slug: 'favorites',
    },
    {
      name: intl.formatMessage({ id: 'page.profile.tabs.activity' }),
      slug: 'activity',
    },
  ]

  const PROFILE_SETTINGS_TABS: ITab[] = [
    {
      icon: UserSvgIcon,
      iconWidth: 18,
      iconHeight: 19,
      name: intl.formatMessage({ id: 'page.home.footer.section.label.profile' }),
      slug: 'profile',
    },
    {
      icon: StarSvgIcon,
      iconWidth: 21,
      iconHeight: 19,
      name: intl.formatMessage({ id: 'page.settings.sidebar.featured_items' }),
      slug: 'featured_items',
    },
    {
      icon: NotificationSvgIcon,
      iconWidth: 15,
      iconHeight: 20,
      name: intl.formatMessage({ id: 'page.settings.sidebar.notifications' }),
      slug: 'notifications',
    },
    {
      icon: ChatSvgIcon,
      iconWidth: 17,
      iconHeight: 14,
      name: intl.formatMessage({ id: 'page.settings.sidebar.offers' }),
      slug: 'offers',
    },
    {
      icon: CommentSvgIcon,
      iconWidth: 17,
      iconHeight: 16,
      name: intl.formatMessage({ id: 'page.settings.sidebar.account_support' }),
      slug: 'account_support',
    },
    {
      icon: WalletSvgIcon,
      iconWidth: 19,
      iconHeight: 17,
      name: intl.formatMessage({ id: 'page.settings.sidebar.earnings' }),
      slug: 'earnings',
    },
  ]

  const initPriceChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    aspectRatio: 4,
    maintainAspectRatio: true,
    stacked: false,
    font: {
      family: 'Poppins-400',
      lignHeight: '98.3%',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        border: {
          display: false
        },
        grid: {
          color: '#D7CDE5',
        },
        title: {
          display: true,
          text: 'Volumn (ETH)',
          font: {
            family: 'Poppins-700',
          },
          padding: {
            bottom: 35,
          },
        },
        min: 0,
        max: 0.012,
        ticks: {
          stepSize: 0.006,
          font: {
            size: 12,
          },
        },
      },
      y1: {
        border: {
          display: false
        },
        grid: {
          display: false,
        },
        position: 'right' as const,
        title: {
          display: true,
          text: 'Average price (ETH)',
          font: {
            family: 'Poppins-700',
          },
          padding: {
            bottom: 35,
          },
        },
        min: 0.009,
        max: 0.021,
        ticks: {
          stepSize: 0.006,
          font: {
            size: 12,
          },
        },
      },
    },
  }

  const TIME_RANGES: ITab[] = [
    {
      name: '1h',
      slug: 'one_hour_volume'
    },
    {
      name: '6h',
      slug: 'six_hour_volume'
    },
    {
      name: '24h',
      slug: 'one_day_volume'
    },
    {
      name: '7d',
      slug: 'seven_day_volume'
    },
    {
      name: '30d',
      slug: 'thirty_day_volume'
    },
    {
      name: 'All',
      slug: 'total_volume'
    },
  ]

  const EVENTS_OPTIONS: IFilterOption[] = [
    {
      label: intl.formatMessage({'id': 'page.rankings.label.sales'}),
      value: 'sales',
    },
    {
      label: intl.formatMessage({'id': 'page.nft_detail.history.listings'}),
      value: 'listings',
    },
    {
      label: intl.formatMessage({'id': 'page.settings.sidebar.offers'}),
      value: 'offers',
    },
    {
      label: intl.formatMessage({'id': 'page.activity.filter.sidebar.event_type.collection_offers'}),
      value: 'collection_offers',
    },
    {
      label: intl.formatMessage({'id': 'page.activity.filter.sidebar.event_type.transfers'}),
      value: 'transfers',
    },
  ]

  const REFERRAL_COMMISSION_MINIMUM_AMOUNT: number = 0.00001

  const NOTIFICATION_OPTIONS: ITab[] = [
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.item_sold.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.item_sold.desc'}),
      slug: 'itemSold',
    },
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.bid_activity.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.bid_activity.desc'}),
      slug: 'bidActivity',
    },
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.price_change.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.price_change.desc'}),
      slug: 'priceChange',
    },
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.auction_expiration.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.auction_expiration.desc'}),
      slug: 'auctionExpiration',
    },
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.outbid.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.outbid.desc'}),
      slug: 'outBid',
    },
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.owned_item_updates.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.owned_item_updates.desc'}),
      slug: 'ownedItemUpdates',
    },
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.successful_purchase.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.successful_purchase.desc'}),
      slug: 'successfulPurchase',
    },
    {
      name: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.newsletter.name'}),
      description: intl.formatMessage({'id': 'page.account.settings.tab.notifications.option.newsletter.desc'}),
      slug: 'newsletter',
    },
  ]
  
  return {
    MENUS, 
    STATUS_OPTIONS,
    QUANTITY_OPTIONS,
    SORT_BY,
    ATTRIBUTS,
    CONTENT_STATUSES,
    PAYMENT_TOKENS,
    COLLECTION_THEMES,
    HOME_FEATURED_TABS,
    PROFILE_TABS,
    PROFILE_SETTINGS_TABS,
    initPriceChartOptions,
    TIME_RANGES,
    EVENTS_OPTIONS,
    REFERRAL_COMMISSION_MINIMUM_AMOUNT,
    NOTIFICATION_OPTIONS,
  }
}

export default constants
