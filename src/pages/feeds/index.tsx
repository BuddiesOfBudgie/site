import { getPosts, getPostsByTags } from '../../common/getPosts';
import { Feed } from 'feed';
import { getPrettyTagName } from '../../common/getPrettyTagName';
import { DOMAIN, ORG } from '../../constants';
import { People } from '../../data/people';
import { writeFileSync } from 'fs';
import { join } from 'path';
import PageBase from '../../components/PageBase';
import type { CustomMetaProps } from '../../components/CustomMeta';
import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslations } from 'next-intl';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import NextLink from '../../components/Link';
import { PopText } from '../../components/pop/PopText';
import { getLocale } from '../../common/getLocale';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

type fubarProps = {
  className: PageProps;
};

const FeedPage = ({ className: { tags } }: fubarProps) => {
  const t = useTranslations();
  const meta: CustomMetaProps = {
    title: t('Feeds'),
  };

  return (
    <PageBase meta={meta} navBgColor="misc.lightgrey">
      <Stack alignItems="center" spacing={4}>
        <PopText
          align="center"
          sx={{
            color: grey[800],
            marginBlockStart: '2vh',
            textAlign: {},
          }}
          variant="h2"
        >
          {t('Feeds')}
        </PopText>
        {tags.map((t) => (
          <Stack direction="row" key={`feed-tr-${t}`} justifyContent="space-between" width={400}>
            <Typography width={180} variant="body1">
              {getPrettyTagName(t)}
            </Typography>
            <Typography color="success.main" variant="body1">
              <NextLink href={`/feeds/${t}.atom`} target="_blank">
                Atom
              </NextLink>
            </Typography>
            <Typography color="success.main" variant="body1">
              <NextLink href={`/feeds/${t}.xml`} target="_blank">
                RSS 2.0
              </NextLink>
            </Typography>
          </Stack>
        ))}
      </Stack>
    </PageBase>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = getLocale(context);
  const posts = getPosts();
  const postsByTags = getPostsByTags(posts);
  const tags = Object.keys(postsByTags);

  Object.keys(postsByTags).forEach((t) => {
    const postsInTag = postsByTags[t];
    const prettyTagName = getPrettyTagName(t);
    const f = new Feed({
      title: `${prettyTagName} | ${ORG}`,
      description: `${ORG} posts in the category ${prettyTagName}`,
      id: DOMAIN,
      link: DOMAIN,
      language: 'en',
      favicon: `${DOMAIN}/favicon.ico`,
      copyright: ORG,
      updated: new Date(posts[0].publishDate),
    });

    postsInTag.posts.forEach((p) => {
      const author = People[p.author];
      f.addItem({
        title: p.title,
        id: `${DOMAIN}/blog/${p.id}`,
        link: `${DOMAIN}/blog/${p.id}`,
        description: p.excerpt,
        author: [
          {
            name: `${author.Names.First} ${author.Names.Last}`,
            link: author.Social?.Website ?? undefined,
          },
        ],
        date: new Date(p.publishDate),
        image: `${DOMAIN}/${p.featuredImage}`,
      });
    });

    writeFileSync(join(process.cwd(), 'public', 'feeds', `${t}.atom`), f.atom1());
    writeFileSync(join(process.cwd(), 'public', 'feeds', `${t}.xml`), f.rss2());
  });

  const messages = (await import(`../../messages/${locale}.json`)).default as IntlMessages;
  return {
    props: {
      locale,
      messages,
      tags,
    },
  };
};

export default FeedPage;
