import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { colors } from '@/theme';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import Back from '@/assets/icons/back.svg';
import Camera from '@/assets/icons/camera.svg';
import Close from '@/assets/icons/close.svg';
import CreateReport from '@/assets/icons/create-report.svg';
import Done from '@/assets/icons/done.svg';
import Duplicate from '@/assets/icons/duplicate.svg';
import Filter from '@/assets/icons/filter.svg';
import Flashlight from '@/assets/icons/flashlight.svg';
import Frame from '@/assets/icons/frame.svg';
import Home from '@/assets/icons/home.svg';
import InProgress from '@/assets/icons/in-progress.svg';
import Language from '@/assets/icons/language.svg';
import Location from '@/assets/icons/location.svg';
import Logout from '@/assets/icons/logout.svg';
import MapIcon from '@/assets/icons/map.svg';
import MyReports from '@/assets/icons/my-reports.svg';
import Notifications from '@/assets/icons/notifications.svg';
import Pending from '@/assets/icons/pending.svg';
import Photo from '@/assets/icons/photo.svg';
import Profile from '@/assets/icons/profile.svg';
import QrCode from '@/assets/icons/qr-code.svg';
import Search from '@/assets/icons/search.svg';
import SwitchCamera from '@/assets/icons/switch-camera.svg';
import Warning from '@/assets/icons/warning.svg';
import Check from '@/assets/icons/check.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import Eye from '@/assets/icons/eye.svg';
import LayoutDashboard from '@/assets/icons/layout-dashboard.svg';
import Lock from '@/assets/icons/lock.svg';
import RotateCw from '@/assets/icons/rotate-cw.svg';
import Upload from '@/assets/icons/upload.svg';
import UserRound from '@/assets/icons/user-round.svg';

const icons = {
    'arrow-right': ArrowRight,
    back: Back,
    camera: Camera,
    close: Close,
    'create-report': CreateReport,
    done: Done,
    duplicate: Duplicate,
    filter: Filter,
    flashlight: Flashlight,
    frame: Frame,
    home: Home,
    'in-progress': InProgress,
    language: Language,
    location: Location,
    logout: Logout,
    map: MapIcon,
    'my-reports': MyReports,
    notifications: Notifications,
    pending: Pending,
    photo: Photo,
    profile: Profile,
    'qr-code': QrCode,
    search: Search,
    'switch-camera': SwitchCamera,
    warning: Warning,
    check: Check,
    'chevron-down': ChevronDown,
    'chevron-left': ChevronLeft,
    eye: Eye,
    'layout-dashboard': LayoutDashboard,
    lock: Lock,
    'rotate-cw': RotateCw,
    upload: Upload,
    'user-round': UserRound,
} satisfies Record<string, FC<SvgProps>>;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

type Props = {
    name: IconName;
    size?: number;
    color?: string;
};

export function Icon({ name, size = 24, color = colors.text.primary }: Props) {
    const Svg = icons[name];
    return <Svg width={size} height={size} color={color} />;
}
