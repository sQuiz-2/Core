import { TitleCard } from '@Src/components/Card';
import userState from '@Src/global/userState';
import { capitalizeFirstLetter } from '@Src/utils/text';
import { get } from '@Src/utils/wrappedFetch';
import { useTheme } from '@react-navigation/native';
import { ThemeStats } from '@squiz/shared';
import React, { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './StatByThemesStyle';

export default function StatByThemes() {
  const user = useRecoilValue(userState);
  const [stats, setStats] = useState<ThemeStats>({ userStatsThemes: [], globalThemeStats: [] });
  const { colors } = useTheme();

  async function fetchStats() {
    if (!user.token) return;
    try {
      const themeStats = await get<ThemeStats>({ path: 'theme-stats', token: user.token });
      if (!themeStats) return;
      setStats(themeStats);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [user]);

  const primaryAxis = useMemo<AxisOptions<typeof data[number]['data'][number]>>(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<typeof data[number]['data'][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        hardMax: 100,
        hardMin: 0,
        formatters: {
          cursor: (value: any, formatters: any) => {
            return formatters.default(value) + '%';
          },
          tooltip: (value: any, formatters: any) => {
            return formatters.default(value) + '%';
          },
          scale: (value: any, formatters: any) => {
            return formatters.default(value) + '%';
          },
        },
      },
    ],
    []
  );

  const userStats = stats.userStatsThemes.map(({ title, correct, played }) => ({
    secondary: (correct / played) * 100,
    primary: capitalizeFirstLetter(title),
  }));

  const allUserStatTitles = stats.userStatsThemes.map(({ title }) => title);
  const globalStats = stats.globalThemeStats
    .filter(({ title }) => allUserStatTitles.includes(title))
    .map(({ title, correct, played }) => ({
      secondary: (correct / played) * 100,
      primary: capitalizeFirstLetter(title),
    }));

  const data = [
    {
      label: 'moi',
      data: userStats,
    },
    {
      label: 'global',
      data: globalStats,
    },
  ];

  if (userStats.length <= 0) return null;

  return (
    <TitleCard title="STATISTIQUES PAR CATÉGORIES">
      <View style={styles.container}>
        <View style={styles.chart}>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              dark: true,
              getSeriesStyle: (series) => {
                return {
                  color: series.index === 1 ? colors.text : colors.notification,
                };
              },
            }}
          />
        </View>
      </View>
    </TitleCard>
  );
}
