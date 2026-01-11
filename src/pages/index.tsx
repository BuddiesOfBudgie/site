import type { GetStaticPropsContext, NextPage } from 'next';
import type { CustomMetaProps } from '../components/CustomMeta';

// Material UI Bits
import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

// Our components
import { ColorBanner } from '../components/ColorBanner';
import { HeroBanner } from '../components/home/HeroBanner';
import { PersonalizeBanner } from '../components/home/PersonalizeBanner';
import PageBase from '../components/PageBase';

import BudgieMenuImage from '../../public/images/BudgieMenu.jpg';
import RavenImage from '../../public/images/Raven-WidgetView.jpg';

import type { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import { Uris } from '../constants';
import { useState } from 'react';
import { LightboxImage } from '../components/LightboxImage';
import { poppins } from '../fonts';
import { PopText } from '../components/pop/PopText';
import { InterText } from '../components/InterText';
import { SiteTheme } from '../theme';
import { getLocale } from '../common/getLocale';

type HomepageImageBannerContent = {
  AltImageText: string;
  Headline: string;
  Image: StaticImageData;
  Subtext: string;
  TabText: string;
};

export const meta: CustomMetaProps = {
  title: 'Home',
};

const Home: NextPage = () => {
  const [featureTab, setFeatureTab] = useState(0);
  const t = useTranslations();

  const theme = useTheme();
  const colorBannersStackDirection = useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column';
  const colorBannersComponentMaxWidth = useMediaQuery(theme.breakpoints.up('md')) ? '46%' : '100%';

  const imageBannerContent: HomepageImageBannerContent[] = [
    {
      AltImageText: 'Budgie Menu Image',
      Headline: t('Home.Tabs.MenuHeader'),
      Image: BudgieMenuImage,
      Subtext: t('Home.Tabs.MenuText'),
      TabText: t('Home.Tabs.MenuTabText'),
    },
    {
      AltImageText: 'Raven',
      Headline: t('Home.Tabs.RavenHeader'),
      Image: RavenImage,
      Subtext: t('Home.Tabs.RavenText'),
      TabText: t('Home.Tabs.RavenTabText'),
    },
  ];

  return (
    <PageBase meta={meta}>
      <Container maxWidth="fullhd">
        <HeroBanner />
        <Stack alignItems="center" maxWidth="fullhd">
          <Tabs
            TabIndicatorProps={{
              style: {
                background: SiteTheme.palette.success.main,
              },
            }}
            allowScrollButtonsMobile
            onChange={(_, value: number) => setFeatureTab(value)}
            sx={{
              '.MuiTabs-scrollButtons.Mui-disabled': {
                opacity: 0.3,
              },
            }}
            variant="scrollable"
            value={featureTab}
          >
            {imageBannerContent.map((data) => (
              <Tab
                className={poppins.className}
                key={`HomeTabs-Tab-${data.TabText}`}
                label={data.TabText}
                sx={{
                  fontSize: '1.1em',
                  textTransform: 'none',
                  ['&.Mui-selected']: {
                    color: SiteTheme.palette.success.main,
                  },
                }}
              />
            ))}
          </Tabs>
          {imageBannerContent.map((data, idx) => {
            const { AltImageText, Headline, Image, Subtext } = data;

            return (
              <Box key={`HomeTabs-TabPanel-${data.TabText}`} role="tabpanel" hidden={featureTab !== idx}>
                <Stack alignItems="center" rowGap={2} marginY={2}>
                  <LightboxImage
                    altImageText={AltImageText}
                    key={`imagebanner-${AltImageText}`}
                    height={Image.height}
                    image={Image}
                    priority={idx === 0}
                    previewHeight={506}
                    previewWidth={900}
                    width={Image.width}
                  />
                  <Stack
                    alignItems="flex-start"
                    spacing={2}
                    paddingTop={2}
                    paddingX={2}
                    sx={{
                      [theme.breakpoints.up('md')]: {
                        marginInlineStart: '2vh',
                        maxWidth: 800,
                      },
                    }}
                  >
                    <PopText color="success.main" variant="h5">
                      {Headline}
                    </PopText>
                    <InterText
                      sx={{
                        lineHeight: 1.5,
                      }}
                      variant="h6"
                    >
                      {Subtext}
                    </InterText>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Container>
      <PersonalizeBanner />
      <Container maxWidth="fullhd">
        <Stack
          direction={colorBannersStackDirection}
          justifyContent="space-between"
          sx={{
            '& .ColorBanner': {
              maxWidth: colorBannersComponentMaxWidth,
              marginBottom: '2vh',
            },
          }}
        >
          <ColorBanner
            backgroundColor="linear-gradient(to right, #9f7beb, #7b83eb)"
            body={t('Home.ColorBanner.Built.Text')}
            buttonHref="/about/organization"
            buttonText={t('LearnMore')}
            buttonTextColor="#9E7BEB"
            header={t('Home.ColorBanner.Built.Header')}
          />
          <ColorBanner
            backgroundColor="linear-gradient(to right, #1687C7, #4DB2EC)"
            body={t('Home.ColorBanner.Get.Text')}
            buttonHref={Uris.GET_BUDGIE}
            buttonText={t('Get Budgie')}
            buttonTextColor="#1687C7"
            header={t('Home.ColorBanner.Get.Header')}
          />
        </Stack>
      </Container>
    </PageBase>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = getLocale(context);
  return {
    props: {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
};

export default Home;
