import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className="flex items-center gap-1.5 text-sm mb-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-foreground-400 hover:text-primary-500 transition-colors"
      >
        <i className="ri-home-4-line text-base"></i>
        <span>首页</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={index} className="inline-flex items-center gap-1.5">
            <i className="ri-arrow-right-s-line text-base text-secondary-400"></i>
            {isLast || !item.to ? (
              <span className="text-foreground-700 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="text-foreground-400 hover:text-primary-500 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
