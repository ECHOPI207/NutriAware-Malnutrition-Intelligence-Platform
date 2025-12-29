import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/data/articles';
import { useLanguage } from '@/contexts/LanguageContext';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const dedent = (str: string) => {
    if (!str) return str;
    const lines = str.split('\n');

    // Skip the first line for indent calculation as it's often on the same line as the opening backtick
    const linesToCheck = lines.slice(1);

    const minIndent = linesToCheck.reduce((min, line) => {
      if (!line.trim()) return min;
      const leadingSpaces = line.match(/^[ ]*/)?.[0].length || 0;
      return Math.min(min, leadingSpaces);
    }, Infinity);

    if (minIndent === Infinity) return str;

    const dedented = lines.map((line, index) => {
      if (index === 0) return line.trim();
      return line.length >= minIndent ? line.slice(minIndent) : line;
    }).join('\n');

    // Fix CommonMark invalid bold syntax (** text ** -> **text**)
    // We use [ \t] instead of \s to avoid stripping newlines, which destroys paragraph formatting
    return dedented.replace(/\*\*[ \t]+/g, '**').replace(/[ \t]+\*\*/g, '**');
  };

  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <Button asChild>
            <Link to="/knowledge">
              <ArrowLeft className="h-4 w-4 me-2" />
              Back to Knowledge Hub
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'undernutrition':
        return 'bg-accent/10 text-accent';
      case 'overnutrition':
        return 'bg-secondary/10 text-secondary';
      case 'foodSafety':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/knowledge">
            <ArrowLeft className="h-4 w-4 me-2" />
            {t('common.back')}
          </Link>
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                <img
                  src={article.imageUrl}
                  alt={article.title[language as 'en' | 'ar']}
                  className="w-full h-full object-cover"
                />
              </div>

              <Badge className={`${getCategoryColor(article.category)} mb-4`}>
                {t(`categories.${article.category}`)}
              </Badge>

              <h1 className="text-3xl xl:text-4xl font-bold mb-4">
                {article.title[language as 'en' | 'ar']}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {article.excerpt[language as 'en' | 'ar']}
              </p>

              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-ul:list-none prose-ul:space-y-2 prose-li:pl-0 prose-strong:text-foreground">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                    ul: ({ children }) => <ul className="space-y-2 my-4">{children}</ul>,
                    li: ({ children }) => (
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                  }}
                >
                  {dedent(article.content[language as 'en' | 'ar'])}
                </ReactMarkdown>
              </div>
            </motion.article>
          </div>

          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {t('articles.keyTakeaways')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {article.keyTakeaways[language as 'en' | 'ar'].map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t('articles.relatedArticles')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {articles
                      .filter(a => a.id !== article.id && a.category === article.category)
                      .slice(0, 3)
                      .map(relatedArticle => (
                        <Link
                          key={relatedArticle.id}
                          to={`/knowledge/${relatedArticle.id}`}
                          className="block p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <h4 className="font-medium text-sm mb-1">
                            {relatedArticle.title[language as 'en' | 'ar']}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {relatedArticle.excerpt[language as 'en' | 'ar']}
                          </p>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
