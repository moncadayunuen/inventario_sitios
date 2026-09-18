import type { ReactNode } from 'react';

import './pageHeader.scss';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

export default function PageHeader({
   title,
   description,
   action,
}: PageHeaderProps) {
    return (
        <header className="page-header">
            <div className="page-header__content">
                <h1 className="page-header__title">{title}</h1>

                {description && (
                    <p className="page-header__description">{description}</p>
                )}
            </div>

            {action && (
                <div className="page-header__action">
                    {action}
                </div>
            )}
        </header>
    );
}