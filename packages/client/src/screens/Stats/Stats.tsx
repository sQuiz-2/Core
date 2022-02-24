import { TitleCard } from '@Src/components/Card';
import { CenterContainer, ResponsiveContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { capitalizeFirstLetter } from '@Src/utils/text';
import { get } from '@Src/utils/wrappedFetch';
import { useTheme } from '@react-navigation/native';
import { GetDifficultyFromId, GetThemes, MeBasic } from '@squiz/shared';
import React, { useEffect, useMemo, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { ActivityIndicator, Image, View } from 'react-native';
import Svg, { Circle, Line, Polygon, Text as TextSVG } from 'react-native-svg';
import { useRecoilValue } from 'recoil';

import useStatsStyle from './StatsStyle';

// import useDemoConfig from "../useDemoConfig";
// import React from "react";
// import ResizableBox from "../ResizableBox";

export default function Stats() {
  const user = useRecoilValue(userState);
  const [stats, setStats] = useState<MeBasic>();
  const [themes, setThemes] = useState<GetThemes>([]);
  const styles = useStatsStyle();

  async function fetchStats() {
    if (!user.token) return;
    try {
      const result = await get<MeBasic>({ path: 'me-basic', token: user.token });
      if (!result) return;
      setStats(result);
    } catch (error) {
      console.error(error);
    }
    try {
      const themes = await get<GetThemes>({ path: 'themes' });
      if (!themes) return;
      console.log(themes);
      setThemes(themes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [user]);

  if (!stats) {
    return (
      <CenterContainer>
        <ActivityIndicator />
      </CenterContainer>
    );
  }

  const test = themes.map(({ title }) => ({
    secondary: randomIntFromInterval(40, 90),
    primary: capitalizeFirstLetter(title),
  }));

  const test2 = themes.map(({ title }) => ({
    secondary: randomIntFromInterval(40, 90),
    primary: capitalizeFirstLetter(title),
  }));

  if (test.length <= 0) return null;

  return (
    <ResponsiveContainer style={styles.responsiveContainer}>
      <View style={styles.container}>
        <TitleCard title="STATISTIQUES DES PARTIES" containerStyle={styles.column}>
          {stats.gameStats.length === 0 && (
            <Text fontSize="lg" style={styles.bold}>
              Aucune statistique disponnible
            </Text>
          )}
          {stats.gameStats.map((game) => {
            return (
              <View style={styles.row}>
                <Image style={styles.image} source={require('@Assets/images/keyboard.png')} />
                <View>
                  <Text fontSize="lg" style={styles.bold}>
                    {GetDifficultyFromId(game.difficultyId).title}
                  </Text>
                  <Text fontSize="sm">Jouées : {game.played}</Text>
                  <Text fontSize="sm">Gagnées : {game.win}</Text>
                  <Text fontSize="sm">Podium : {game.podium}</Text>
                </View>
              </View>
            );
          })}
        </TitleCard>
        <TitleCard title="STATISTIQUES DES QUESTIONS" containerStyle={styles.column}>
          {stats.gameStats.length === 0 && (
            <Text fontSize="lg" style={styles.bold}>
              Aucune statistique disponnible
            </Text>
          )}
          {stats.roundStats.map((game) => {
            return (
              <View style={styles.row}>
                <Image style={styles.image} source={require('@Assets/images/keyboard.png')} />
                <View>
                  <Text fontSize="lg" style={styles.bold}>
                    {GetDifficultyFromId(game.difficultyId).title}
                  </Text>
                  <Text fontSize="sm">Jouées : {game.played}</Text>
                  <Text fontSize="sm">
                    Réussies : {game.correct}({Math.floor((game.correct / game.played) * 100)}%)
                  </Text>
                </View>
              </View>
            );
          })}
        </TitleCard>
      </View>
      <View style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <View style={{ height: 500, width: 1500 }}>
          <Bar userStats={test} globalStats={test2} />
        </View>
      </View>
    </ResponsiveContainer>
  );
}

function Bar({
  userStats,
  globalStats,
}: {
  userStats: { primary: string; secondary: number }[];
  globalStats: { primary: string; secondary: number }[];
}) {
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

  const primaryAxis = React.useMemo<AxisOptions<typeof data[number]['data'][number]>>(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<AxisOptions<typeof data[number]['data'][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        dark: true,
        getSeriesStyle: (series) => {
          return {
            color: series.index === 1 ? 'blue' : 'pink',
          };
        },
      }}
    />
  );
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* type RadarData = {
  value: number;
  label: string;
};

type Props = {
  radarData: RadarData[];
  size: number;
};

type Point = [number, number];

const svgY = (degrees: number) => degrees + 180;

function degToRadians(degree: number) {
  return (degree * Math.PI) / 180.0;
}

const calculateEdgePointFn = (center: number, radius: number) => (
  degree: number,
  scale: number = 1
): Point => {
  const degreeInRadians = degToRadians(degree);
  const degreeInRadiansY = degToRadians(svgY(degree));
  return [
    center + Math.cos(degreeInRadians) * radius * scale,
    center + Math.sin(degreeInRadiansY) * radius * scale,
  ];
}; */

/* const Compo = (props: Props) => {
  const viewBoxSize = props.size || 120;
  const viewBoxCenter = viewBoxSize * 0.5;
  const radius = viewBoxSize * 0.4;
  const { colors } = useTheme();

  const calculateEdgePoint = useMemo(() => calculateEdgePointFn(viewBoxCenter, radius), [radius]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Svg height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <Circle
          cx={viewBoxCenter}
          cy={viewBoxCenter}
          r={radius}
          stroke={colors.background}
          strokeOpacity="0.2"
          strokeWidth="0.5"
          fill={colors.card}
        />

        {Array.apply(null, Array(3))
          .map(function (x, i) {
            return i;
          })
          .map((i) => (
            <Circle
              key={`circle_outline_${i}`}
              cx={viewBoxCenter}
              cy={viewBoxCenter}
              r={(i + 1) * radius * 0.25}
              stroke={colors.border}
              strokeOpacity="1"
              strokeWidth="0.1"
              fill="transparent"
            />
          ))}

        {Array.apply(null, Array(20))
          .map(function (x, i) {
            return i;
          })
          .map((i) => (
            <Line
              key={`crosshair_${i}`}
              x1={calculateEdgePoint(i * 9)[0]}
              y1={calculateEdgePoint(i * 9)[1]}
              x2={calculateEdgePoint(i * 9 + 180)[0]}
              y2={calculateEdgePoint(i * 9 + 180)[1]}
              stroke={colors.border}
              strokeOpacity="1"
              strokeWidth="0.1"
              fill="transparent"
            />
          ))}

        <Polygon
          stroke="#3E2A27"
          strokeWidth={0.2}
          fill="#3E2A27"
          fillOpacity={0.5}
          points={`${props.radarDataMoy.map((r, i) => {
            const edgePoint = calculateEdgePoint(i * 9, r.value / 100);
            return `${edgePoint[0]},${edgePoint[1]}`;
          })}`}
        />
        <Polygon
          stroke="#2F3A49"
          strokeWidth={0.2}
          fill="#2F3A49"
          fillOpacity={0.5}
          points={`${props.radarData.map((r, i) => {
            const edgePoint = calculateEdgePoint(i * 9, r.value / 100);
            return `${edgePoint[0]},${edgePoint[1]}`;
          })}`}
        />

        {props.radarData.map(({ label, value }, i) => {
          const edgePoint = calculateEdgePoint(i * 9, 1.03);
          return (
            <TextSVG
              x={edgePoint[0]}
              y={edgePoint[1]}
              fontSize="1.5"
              fill="white"
              fontFamily="OpenSans"
              textAnchor="middle">
              {capitalizeFirstLetter(label)}
            </TextSVG>
          );
        })}
      </Svg>
    </View>
  );
}; */
