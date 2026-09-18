import { useState } from 'react';

import {
    NavLink,
    Outlet,
} from 'react-router-dom';
import {
    MdArrowDropDown,
    MdArrowOutward,
    MdHelpOutline,
    MdInventory2,
    MdNotificationsNone,
    MdSearch,
} from 'react-icons/md';
import './appLayout.scss';
import {USER_ROLE_LABELS, type UserRole} from "../types/userRole.ts";
import { Dropdown } from "rsuite";

export default function AppLayout() {
    const [userRole, setUserRole] = useState<UserRole>('agency');
    const getNavItemClass = ({isActive,}: { isActive: boolean; }) =>
        [
            'app-layout__nav-item',
            isActive ? 'app-layout__nav-item--active' : '',
        ]
            .filter(Boolean)
            .join(' ');

    return (
        <div className="app-layout">
            <aside className="app-layout__sidebar">
                <NavLink
                    to="/inventory"
                    className="app-layout__brand"
                    aria-label="Marca"
                >
                    <span
                        className="app-layout__brand-mark"
                        aria-hidden="true"
                    >
                        <MdArrowOutward />
                    </span>

                    <span className="app-layout__brand-content">
                        <span className="app-layout__brand-name">
                            Marca
                        </span>

                        <span className="app-layout__brand-description">
                            DESCRIPCIÓN DE MARCA
                        </span>
                    </span>
                </NavLink>

                <nav
                    className="app-layout__navigation"
                    aria-label="Navegación principal"
                >
                    <NavLink
                        to="/inventory"
                        className={getNavItemClass}
                    >
                        <MdInventory2
                            className="app-layout__nav-icon"
                            aria-hidden="true"
                        />

                        <span className="app-layout__nav-label">Inventario</span>
                    </NavLink>
                </nav>

                <div className="app-layout__support">
                    <div
                        className="app-layout__support-icon"
                        aria-hidden="true"
                    >
                        <MdHelpOutline />
                    </div>

                    <div className="app-layout__support-content">
                        <span className="app-layout__support-title">
                            ¿Necesitas ayuda?
                        </span>

                        <span className="app-layout__support-description">
                            Consulta nuestra guía o contacta al equipo.
                        </span>
                    </div>

                    <button
                        type="button"
                        className="app-layout__support-button"
                    >
                        Ir a soporte
                    </button>
                </div>
            </aside>

            <div className="app-layout__workspace">
                <header className="app-layout__header">
                    <div className="app-layout__global-search">
                        <MdSearch
                            className="app-layout__search-icon"
                            aria-hidden="true"
                        />

                        <input
                            type="search"
                            className="app-layout__search-input"
                            placeholder="Buscar por ID, sitio, ubicación o propietario..."
                            aria-label="Búsqueda global"
                        />

                        <span
                            className="app-layout__search-shortcut"
                            aria-hidden="true"
                        >
                            ⌘ K
                        </span>
                    </div>

                    <div className="app-layout__header-actions">
                        <button
                            type="button"
                            className="app-layout__notification"
                            aria-label="Notificaciones"
                        >
                            <MdNotificationsNone />
                        </button>

                        <div className="app-layout__account">
                            <div
                                className="app-layout__avatar"
                                aria-hidden="true"
                            >
                                YM
                            </div>

                            <div className="app-layout__account-info">
                                <span className="app-layout__account-name">
                                    Yahuán Monroy
                                </span>

                                <Dropdown
                                    placement="bottomEnd"
                                    className="app-layout__role-dropdown"
                                    title={
                                        <span className="app-layout__role-trigger">
                                            <span className="app-layout__account-role">
                                                {USER_ROLE_LABELS[userRole]}
                                            </span>
                                        </span>
                                    }
                                >
                                    <Dropdown.Item
                                        active={userRole === 'media_owner'}
                                        onSelect={() => setUserRole('media_owner')}
                                    >
                                        Dueño de medios
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                        active={userRole === 'agency'}
                                        onSelect={() => setUserRole('agency')}
                                    >
                                        Agencia
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                        active={userRole === 'brand'}
                                        onSelect={() => setUserRole('brand')}
                                    >
                                        Marca
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="app-layout__main">
                    <Outlet
                        context={{
                            userRole,
                        }}
                    />
                </main>
            </div>
        </div>
    );
}