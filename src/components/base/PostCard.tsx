import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Eye, Pin, Flame } from 'lucide-react';
import type { Post } from '../../mocks/types';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

const categoryStyles: Record<string, { bg: string; color: string }> = {
  course: { bg: '#FEF3C7', color: '#B45309' },
  activity: { bg: '#FEE2E2', color: '#B91C1C' },
  job: { bg: '#DBEAFE', color: '#1E40AF' },
  study: { bg: '#DCFCE7', color: '#15803D' },
  life: { bg: '#F3E8FF', color: '#7C3AED' },
  lost: { bg: '#FED7AA', color: '#C2410C' },
  other: { bg: '#F5F5F5', color: '#525252' },
};

const categoryNames: Record<string, string> = {
  course: '选课攻略',
  activity: '活动通知',
  job: '招聘信息',
  study: '学习交流',
  life: '校园生活',
  lost: '失物招领',
  other: '其他',
};

export default function PostCard({ post }: PostCardProps) {
  const style = categoryStyles[post.category] || categoryStyles.other;

  return (
    <Link to={`/forum/${post.id}`} className={styles.card}>
      <div className={styles.header}>
        <span
          className={styles.category}
          style={{ background: style.bg, color: style.color }}
        >
          {categoryNames[post.category] || '其他'}
        </span>
        {post.isPinned && (
          <span className={styles.pinned}>
            <Pin size={14} /> 置顶
          </span>
        )}
        {post.isHot && (
          <span className={styles.hot}>
            <Flame size={14} /> 热门
          </span>
        )}
      </div>

      <h3 className={styles.title}>{post.title}</h3>

      <p className={styles.content}>{post.content}</p>

      {post.images && post.images.length > 0 && (
        <div className={styles.images}>
          {post.images.slice(0, 3).map((img, i) => (
            <img key={i} src={img} alt="" className={styles.image} />
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.author}>
          <img src={post.author.avatar} alt={post.author.name} className={styles.avatar} />
          <span className={styles.authorName}>{post.author.name}</span>
          <span className={styles.date}>{post.createdAt}</span>
        </div>

        <div className={styles.stats}>
          <span>
            <Heart size={16} /> {post.likes}
          </span>
          <span>
            <MessageSquare size={16} /> {post.comments}
          </span>
          <span>
            <Eye size={16} /> {post.views}
          </span>
        </div>
      </div>
    </Link>
  );
}