import { useState, useMemo } from 'react';
import { Plus, TrendingUp, Clock } from 'lucide-react';
import PostCard from '../../components/base/PostCard';
import { posts } from '../../mocks/posts';
import { forumCategories } from '../../mocks/types';
import styles from './Forum.module.css';

type SortType = 'hot' | 'newest';

export default function Forum() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortType>('hot');

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'hot') {
      result.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.views - a.views;
      });
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>校园论坛</h1>
          <p className={styles.subtitle}>分享攻略，交流信息</p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.sortBtns}>
            <button
              className={`${styles.sortBtn} ${
                sortBy === 'hot' ? styles.sortBtnActive : ''
              }`}
              onClick={() => setSortBy('hot')}
            >
              <TrendingUp size={18} />
              热门
            </button>
            <button
              className={`${styles.sortBtn} ${
                sortBy === 'newest' ? styles.sortBtnActive : ''
              }`}
              onClick={() => setSortBy('newest')}
            >
              <Clock size={18} />
              最新
            </button>
          </div>
          <button className={styles.publishBtn}>
            <Plus size={20} />
            发布帖子
          </button>
        </div>

        {/* Categories */}
        <div className={styles.categories}>
          {forumCategories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${
                selectedCategory === cat.id ? styles.categoryBtnActive : ''
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className={styles.posts}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className={styles.empty}>
            <p>该板块暂无帖子</p>
          </div>
        )}
      </div>
    </div>
  );
}