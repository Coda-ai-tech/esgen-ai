export enum DataTypeProps {
  test = 'test', // use local i18n data
  data = 'data', // fetch from CMS API
}

export interface Module<C, O> {
  id: string;
  module: string;
  moduleOption: O;
  content: C;
}

export interface ModuleData<D, O> {
  order: number;
  data: Module<D, O>;
}

export enum ButtonVariantion {
  contain = 'contain', // with color bg
  outline = 'outline', // with transparent bg & outline
  default = 'default', // with no bg & no outline
}

export enum ButtonSize {
  md = 'md',
  sm = 'sm',
  lg = 'lg',
}

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  transparent = 'transparent',
}

export enum ButtonIconPosition {
  left = 'left',
  right = 'right',
}

export enum ButtonAction {
  routeLink = 'routeLink',
  external = 'external',
  callback = 'callback',
  newWindow = 'newWindow',
  submit = 'submit',
}

export interface ButtonLinkElement {
  type: ButtonAction | string;
  href: string | null;
}

export interface ButtonElementDefault {
  label: string;
  link: ButtonLinkElement;
}

export interface ButtonElement<IconList> extends ButtonElementDefault {
  variant?: ButtonVariantion | string;
  color?: ButtonColor | string;
  icon?: {
    name: IconList;
    position: ButtonIconPosition;
  } | null;
  callback?: () => void;
  callBackData?: any;
}

export enum MediaFormat {
  image = 'image',
  video = 'video',
}

export type Source = {
  desktop: string;
  mobile: string;
};

export interface MediaElement {
  type: MediaFormat;
  src: Source;
  alt: string;
  poster: MediaElement;
}
