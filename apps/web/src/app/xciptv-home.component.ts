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
                    <div class="xc-topbar">
                        <div class="xc-clock">
                            <span class="xc-dot"></span>
                            <span>{{ source.title || source.filename || 'Xtream Codes' }}</span>
                        </div>
                        <div class="xc-top-actions">
                            <a [routerLink]="['/workspace/xtreams', source._id, 'search']" title="Pesquisar"><mat-icon>search</mat-icon></a>
                            <a [routerLink]="['/workspace/settings/general']" title="Configurações"><mat-icon>settings</mat-icon></a>
                        </div>
                    </div>

                    <div class="xc-logo" aria-label="IPTV Home">
                        <span class="xc-logo__ring"><mat-icon>play_arrow</mat-icon></span>
                        <strong>IPTV</strong>
                    </div>

                    <nav class="xc-main-grid" aria-label="Conteúdo principal">
                        <a class="xc-tile" [routerLink]="['/workspace/xtreams', source._id, 'live']">
                            <span class="xc-tile__icon"><mat-icon>live_tv</mat-icon></span>
                            <strong>LIVE TV</strong>
                        </a>
                        <a class="xc-tile" [routerLink]="['/workspace/xtreams', source._id, 'live']">
                            <span class="xc-tile__icon"><mat-icon>featured_play_list</mat-icon></span>
                            <strong>EPG</strong>
                        </a>
                        <a class="xc-tile" [routerLink]="['/workspace/xtreams', source._id, 'vod']">
                            <span class="xc-tile__icon"><mat-icon>movie</mat-icon></span>
                            <strong>VOD</strong>
                        </a>
                        <a class="xc-tile" [routerLink]="['/workspace/xtreams', source._id, 'series']">
                            <span class="xc-tile__icon"><mat-icon>video_library</mat-icon></span>
                            <strong>SERIES</strong>
                        </a>
                    </nav>

                    <nav class="xc-footer-menu" aria-label="Atalhos">
                        <a [routerLink]="['/workspace/sources']"><mat-icon>person</mat-icon><span>ACCOUNT</span></a>
                        <a [routerLink]="['/workspace/xtreams', source._id, 'recent']"><mat-icon>history</mat-icon><span>RECENT</span></a>
                        <a [routerLink]="['/workspace/xtreams', source._id, 'recently-added']"><mat-icon>update</mat-icon><span>CATCH UP</span></a>
                        <a [routerLink]="['/workspace/xtreams', source._id, 'favorites']"><mat-icon>star</mat-icon><span>FAVORITES</span></a>
                        <a [routerLink]="['/workspace/search']"><mat-icon>search</mat-icon><span>SEARCH</span></a>
                        <a [routerLink]="['/workspace/settings/playback']"><mat-icon>settings</mat-icon><span>SETTINGS</span></a>
                    </nav>
                </section>
            }

            <section class="xc-content" [class.xc-content--no-launcher]="!primaryXtream()">
                <lib-workspace-dashboard-rails />
            </section>
        </main>
    `,
    styles: `
        :host { display:block; min-width:0; background:#041738; }
        .xc-home { min-height:100%; color:#fff; background:#061a3b; }
        .xc-launcher {
            position:relative; box-sizing:border-box; width:100%; min-height:460px;
            padding:18px 34px 28px; overflow:hidden;
            background:
                radial-gradient(ellipse at 14% 88%, rgba(0,174,255,.70) 0 7%, transparent 28%),
                radial-gradient(ellipse at 40% 118%, rgba(0,109,255,.55) 0 13%, transparent 40%),
                radial-gradient(ellipse at 86% 100%, rgba(0,166,255,.48) 0 8%, transparent 34%),
                linear-gradient(145deg,#06275e 0%,#064aa2 42%,#052866 72%,#04183b 100%);
            border-bottom:1px solid rgba(255,255,255,.16);
        }
        .xc-launcher::before,.xc-launcher::after { content:''; position:absolute; pointer-events:none; border:1px solid rgba(68,201,255,.34); border-radius:50%; transform:rotate(-18deg); }
        .xc-launcher::before { width:125%; height:230px; left:-12%; bottom:-105px; box-shadow:0 -18px 70px rgba(0,174,255,.2); }
        .xc-launcher::after { width:110%; height:190px; left:-4%; bottom:-112px; border-color:rgba(255,255,255,.13); }
        .xc-topbar { position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; min-height:38px; font-size:12px; color:#d9edff; }
        .xc-clock { display:flex; align-items:center; gap:8px; max-width:60%; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
        .xc-dot { width:7px; height:7px; border-radius:50%; background:#33d2ff; box-shadow:0 0 10px #33d2ff; }
        .xc-top-actions { display:flex; gap:8px; }
        .xc-top-actions a { display:grid; place-items:center; width:34px; height:34px; color:#fff; border:1px solid rgba(255,255,255,.24); border-radius:50%; background:rgba(0,19,60,.34); text-decoration:none; }
        .xc-top-actions mat-icon { font-size:20px; width:20px; height:20px; }
        .xc-logo { position:relative; z-index:2; display:flex; align-items:center; justify-content:center; gap:8px; margin:8px 0 26px; }
        .xc-logo__ring { display:grid; place-items:center; width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg,#29d7ff,#0f8dff); border:3px solid rgba(255,255,255,.92); box-shadow:0 0 0 3px rgba(13,117,224,.55),0 8px 24px rgba(0,0,0,.25); }
        .xc-logo__ring mat-icon { font-size:29px; width:29px; height:29px; }
        .xc-logo strong { font-size:18px; letter-spacing:.14em; text-shadow:0 2px 8px rgba(0,0,0,.35); }
        .xc-main-grid { position:relative; z-index:2; width:min(760px,80vw); margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
        .xc-tile { aspect-ratio:1.04; min-width:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:#fff; text-decoration:none; border:2px solid rgba(255,255,255,.78); background:linear-gradient(180deg,rgba(1,35,93,.62),rgba(0,23,65,.78)); box-shadow:inset 0 0 0 1px rgba(28,161,255,.42),0 10px 25px rgba(0,0,0,.18); transition:transform .12s ease,background .12s ease,box-shadow .12s ease; }
        .xc-tile:hover,.xc-tile:focus-visible { outline:none; transform:translateY(-4px) scale(1.02); background:linear-gradient(180deg,rgba(0,104,209,.82),rgba(0,44,117,.88)); box-shadow:0 12px 26px rgba(0,0,0,.3),0 0 18px rgba(54,195,255,.28); }
        .xc-tile__icon { display:grid; place-items:center; width:68px; height:55px; }
        .xc-tile__icon mat-icon { font-size:50px; width:50px; height:50px; font-weight:300; }
        .xc-tile strong { font-size:15px; letter-spacing:.045em; }
        .xc-footer-menu { position:relative; z-index:2; width:min(690px,76vw); margin:34px auto 0; display:grid; grid-template-columns:repeat(6,1fr); gap:7px; }
        .xc-footer-menu a { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; min-height:54px; padding:7px 4px; color:#e7f5ff; text-decoration:none; border:1px solid rgba(255,255,255,.20); background:rgba(0,25,72,.45); font-size:9px; letter-spacing:.035em; }
        .xc-footer-menu a:hover,.xc-footer-menu a:focus-visible { outline:none; background:rgba(0,105,199,.64); border-color:rgba(255,255,255,.54); }
        .xc-footer-menu mat-icon { font-size:21px; width:21px; height:21px; }
        .xc-content { border-top:1px solid rgba(255,255,255,.08); background:#080c13; }
        .xc-content--no-launcher { border-top:0; }
        @media (max-width:900px) { .xc-main-grid { width:92vw; } .xc-footer-menu { width:88vw; } }
        @media (max-width:650px) { .xc-launcher { padding-inline:14px; } .xc-main-grid { grid-template-columns:repeat(2,1fr); width:min(430px,94vw); } .xc-footer-menu { grid-template-columns:repeat(3,1fr); width:min(430px,94vw); } }
        @media (prefers-reduced-motion:reduce) { .xc-tile { transition:none; } }
    `,
})
export class XciptvHomeComponent {
    readonly data = inject(DashboardDataService);
    readonly primaryXtream = computed(() => this.data.playlists().find(isXtreamAccountPlaylist) ?? null);
}
