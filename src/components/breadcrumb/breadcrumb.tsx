import {
    MdChevronRight,
} from 'react-icons/md';

import './breadcrumb.scss';

export interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({
   items,
}: BreadcrumbProps) {
    return (
        <nav
            className="breadcrumb"
            aria-label="Ruta de navegación"
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div
                        key={`${item.label}-${index}`}
                        className="breadcrumb__item"
                    >
                        {item.onClick && !isLast ? (
                            <button
                                type="button"
                                className="breadcrumb__link"
                                onClick={item.onClick}
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span
                                className={[
                                    'breadcrumb__label',
                                    isLast ? 'breadcrumb__label--current' : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                aria-current={isLast ? 'page' : undefined}
                            >
                                {item.label}
                            </span>
                        )}

                        {!isLast && (
                            <MdChevronRight
                                className="breadcrumb__separator"
                                size={16}
                                aria-hidden="true"
                            />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}