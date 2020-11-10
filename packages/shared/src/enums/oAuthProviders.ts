export enum ProviderEnum {
  Twitch,
}

export type Provider = {
  id: ProviderEnum;
  name: string;
  icon: string;
  color: string;
};

export function GetProviders(): Provider[] {
  return [
    {
      id: ProviderEnum.Twitch,
      name: 'Twitch',
      icon: 'twitch',
      color: '#6441a5',
    },
  ];
}
