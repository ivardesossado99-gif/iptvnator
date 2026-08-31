import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { isXtreamAccountPlaylist } from '@iptvnator/shared/interfaces';
import { DashboardDataService } from '@iptvnator/workspace/dashboard/data-access';
import { WorkspaceDashboardRailsComponent } from '@iptvnator/workspace/dashboard/feature';

@Component({
    selector: 'app-xciptv-home',
    imports: [MatIcon, RouterLink, WorkspaceDashboardRailsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <main class="xc-home">
            @if (primaryXtream(); as source) {
                <section class="xc-launcher" data-test-id="xciptv-home-launcher">
                    <header class="xc-header">
                        <div class="xc-brand">
                            <span class="xc-brand__mark">
                                <mat-icon>play_arrow</mat-icon>
                            </span>
                            <span>
                                <strong>IPTV Home</strong>
                                <small>{{ source.title || source.filename || 'Xtream Codes' }}</small>
                            </span>
                        </div>
                        <div class="xc-header__actions">
                            <a
                                class="xc-icon-button"
                                [routerLink]="['/workspace/xtreams', source._id, 'search']"
                                aria-label="Pesquisar"
                                title="Pesquisar"
                            >
                                <mat-icon>search</mat-icon>
                            </a>
                            <a
                                class="xc-icon-button"
                                [routerLink]="['/workspace/settings/general']"
                                aria-label="Configurações"
                                title="Configurações"
                            >
                                <mat-icon>settings</mat-icon>
                            </a>
                        </div>
                    </header>

                    <section class="xc-welcome">
                        <div>
                            <span class="xc-eyebrow">ENTRETENIMENTO</span>
                            <h1>O que você quer assistir?</h1>
                            <p>TV ao vivo, filmes e séries em um só lugar.</p>
                        </div>
                    </section>

                    <nav class="xc-main-grid" aria-label="Conteúdo principal">
                        <a
                            class="xc-main-card xc-main-card--live"
                            [routerLink]="['/workspace/xtreams', source._id, 'live']"
                        >
                            <span class="xc-main-card__icon"><mat-icon>live_tv</mat-icon></span>
                            <span class="xc-main-card__copy">
                                <strong>TV AO VIVO</strong>
                                <small>Canais e programação</small>
                            </span>
                            <mat-icon class="xc-main-card__arrow">chevron_right</mat-icon>
                        </a>

                        <a
                            class="xc-main-card xc-main-card--movies"
                            [routerLink]="['/workspace/xtreams', source._id, 'vod']"
                        >
                            <span class="xc-main-card__icon"><mat-icon>movie</mat-icon></span>
                            <span class="xc-main-card__copy">
                                <strong>FILMES</strong>
                                <small>Catálogo completo</small>
                            </span>
                            <mat-icon class="xc-main-card__arrow">chevron_right</mat-icon>
                        </a>

                        <a
                            class="xc-main-card xc-main-card--series"
                            [routerLink]="['/workspace/xtreams', source._id, 'series']"
                        >
                            <span class="xc-main-card__icon"><mat-icon>theaters</mat-icon></span>
                            <span class="xc-main-card__copy">
                                <strong>SÉRIES</strong>
                                <small>Temporadas e episódios</small>
                            </span>
                            <mat-icon class="xc-main-card__arrow">chevron_right</mat-icon>
                        </a>
                    </nav>

                    <nav class="xc-shortcuts" aria-label="Atalhos">
                        <a [routerLink]="['/workspace/xtreams', source._id, 'favorites']">
                            <mat-icon>favorite</mat-icon>
                            <span>Favoritos</span>
                        </a>
                        <a [routerLink]="['/workspace/xtreams', source._id, 'live']">
                            <mat-icon>calendar_month</mat-icon>
                            <span>EPG</span>
                        </a>
                        <a [routerLink]="['/workspace/xtreams', source._id, 'recently-added']">
                            <mat-icon>new_releases</mat-icon>
                            <span>Recentes</span>
                        </a>
                        <a [routerLink]="['/workspace/search']">
                            <mat-icon>manage_search</mat-icon>
                            <span>Buscar tudo</span>
                        </a>
                        <a [routerLink]="['/workspace/sources']">
                            <mat-icon>dns</mat-icon>
                            <span>Listas</span>
                        </a>
                        <a [routerLink]="['/workspace/settings/playback']">
                            <mat-icon>tune</mat-icon>
                            <span>Player</span>
                        </a>
                    </nav>
                </section>
            }

            <section class="xc-content" [class.xc-content--no-launcher]="!primaryXtream()">
                <lib-workspace-dashboard-rails />
            </section>
        </main>
    `,
    styles: `
        :host {
            display: block;
            min-width: 0;
            background: #080c13;
        }

        .xc-home {
            min-height: 100%;
            background:
                radial-gradient(circle at 75% -20%, rgba(37, 99, 235, 0.18), transparent 38rem),
                linear-gradient(180deg, #0b111b 0, #080c13 34rem, #080c13 100%);
            color: #f7f9fc;
        }

        .xc-launcher {
            box-sizing: border-box;
            width: min(1480px, 100%);
            margin: 0 auto;
            padding: 28px 32px 18px;
        }

        .xc-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 34px;
        }

        .xc-brand,
        .xc-header__actions,
        .xc-main-card,
        .xc-main-card__copy {
            display: flex;
            align-items: center;
        }

        .xc-brand {
            gap: 13px;
            min-width: 0;
        }

        .xc-brand__mark {
            display: grid;
            place-items: center;
            width: 46px;
            height: 46px;
            border-radius: 13px;
            background: #1677ff;
            box-shadow: 0 8px 24px rgba(22, 119, 255, 0.25);
        }

        .xc-brand__mark mat-icon {
            width: 30px;
            height: 30px;
            font-size: 30px;
        }

        .xc-brand strong,
        .xc-brand small {
            display: block;
        }

        .xc-brand strong {
            font-size: 19px;
            line-height: 1.2;
            letter-spacing: 0.01em;
        }

        .xc-brand small {
            max-width: 44vw;
            margin-top: 3px;
            overflow: hidden;
            color: #8f9aad;
            font-size: 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .xc-header__actions {
            gap: 8px;
        }

        .xc-icon-button {
            display: grid;
            place-items: center;
            width: 42px;
            height: 42px;
            border: 1px solid #263142;
            border-radius: 12px;
            background: #121926;
            color: #dbe5f5;
            text-decoration: none;
        }

        .xc-icon-button:hover,
        .xc-icon-button:focus-visible {
            border-color: #49617f;
            background: #182234;
            outline: none;
        }

        .xc-welcome {
            margin-bottom: 24px;
        }

        .xc-eyebrow {
            color: #4f9cff;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.16em;
        }

        .xc-welcome h1 {
            margin: 8px 0 5px;
            font-size: clamp(26px, 3vw, 40px);
            line-height: 1.08;
            letter-spacing: -0.03em;
        }

        .xc-welcome p {
            margin: 0;
            color: #909bad;
            font-size: 14px;
        }

        .xc-main-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
        }

        .xc-main-card {
            position: relative;
            box-sizing: border-box;
            min-height: 130px;
            gap: 17px;
            overflow: hidden;
            padding: 22px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            color: white;
            text-decoration: none;
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.18);
            transition: transform 120ms ease, filter 120ms ease, border-color 120ms ease;
        }

        .xc-main-card::after {
            position: absolute;
            right: -32px;
            bottom: -58px;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            content: '';
        }

        .xc-main-card:hover,
        .xc-main-card:focus-visible {
            z-index: 1;
            border-color: rgba(255, 255, 255, 0.32);
            filter: brightness(1.08);
            outline: none;
            transform: translateY(-3px);
        }

        .xc-main-card--live {
            background: linear-gradient(135deg, #075fd7, #0a84ff);
        }

        .xc-main-card--movies {
            background: linear-gradient(135deg, #b42a42, #e24455);
        }

        .xc-main-card--series {
            background: linear-gradient(135deg, #6638c8, #8b5cf6);
        }

        .xc-main-card__icon {
            display: grid;
            flex: 0 0 auto;
            place-items: center;
            width: 58px;
            height: 58px;
            border-radius: 16px;
            background: rgba(4, 10, 20, 0.2);
        }

        .xc-main-card__icon mat-icon {
            width: 34px;
            height: 34px;
            font-size: 34px;
        }

        .xc-main-card__copy {
            min-width: 0;
            flex: 1;
            align-items: flex-start;
            flex-direction: column;
        }

        .xc-main-card__copy strong {
            font-size: 17px;
            letter-spacing: 0.035em;
        }

        .xc-main-card__copy small {
            margin-top: 5px;
            color: rgba(255, 255, 255, 0.76);
            font-size: 12px;
        }

        .xc-main-card__arrow {
            position: relative;
            z-index: 1;
            flex: 0 0 auto;
            opacity: 0.8;
        }

        .xc-shortcuts {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 10px;
            margin-top: 14px;
        }

        .xc-shortcuts a {
            display: flex;
            min-height: 74px;
            align-items: center;
            justify-content: center;
            gap: 9px;
            padding: 10px;
            border: 1px solid #202b3b;
            border-radius: 14px;
            background: #111824;
            color: #cfd8e8;
            font-size: 12px;
            font-weight: 650;
            text-align: center;
            text-decoration: none;
        }

        .xc-shortcuts mat-icon {
            color: #6eafff;
        }

        .xc-shortcuts a:hover,
        .xc-shortcuts a:focus-visible {
            border-color: #395273;
            background: #172132;
            color: #fff;
            outline: none;
        }

        .xc-content {
            border-top: 1px solid #182131;
        }

        .xc-content--no-launcher {
            border-top: 0;
        }

        @media (max-width: 980px) {
            .xc-launcher {
                padding-inline: 20px;
            }

            .xc-main-grid {
                grid-template-columns: 1fr;
            }

            .xc-main-card {
                min-height: 104px;
            }

            .xc-shortcuts {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }

        @media (max-width: 580px) {
            .xc-launcher {
                padding: 20px 14px 14px;
            }

            .xc-header {
                margin-bottom: 26px;
            }

            .xc-main-card {
                padding: 17px;
                border-radius: 15px;
            }

            .xc-shortcuts {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .xc-shortcuts a {
                min-height: 62px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .xc-main-card {
                transition: none;
            }
        }
    `,
})
export class XciptvHomeComponent {
    readonly data = inject(DashboardDataService);

    readonly primaryXtream = computed(
        () => this.data.playlists().find(isXtreamAccountPlaylist) ?? null
    );
}
