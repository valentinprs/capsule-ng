import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsDropdownMenuImports, type CapsMenuPlacement } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideBadgeCheck,
	lucideBell,
	lucideChevronsUpDown,
	lucideCreditCard,
	lucideLogOut,
	lucideSparkles,
} from '@ng-icons/lucide';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';

@Component({
	selector: 'spartan-nav-user',
	imports: [HlmSidebarImports, CapsAvatarImports, NgIcon, CapsDropdownMenuImports],
	providers: [
		provideIcons({
			lucideChevronsUpDown,
			lucideSparkles,
			lucideBadgeCheck,
			lucideCreditCard,
			lucideBell,
			lucideLogOut,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@let u = user();
		<ul hlmSidebarMenu>
			<li hlmSidebarMenuItem>
				<button hlmSidebarMenuButton size="lg" [capsDropdownMenuTrigger]="menu" [placement]="_avatarPlacement()">
					<caps-avatar class="rounded-lg">
						<img [src]="u.avatar" [alt]="u.name" capsAvatarImage />
						<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">RG</caps-avatar-fallback>
					</caps-avatar>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<span class="truncate font-medium">{{ u.name }}</span>
						<span class="truncate text-xs">{{ u.email }}</span>
					</div>
					<ng-icon name="lucideChevronsUpDown" class="ml-auto text-base" />
				</button>
			</li>
		</ul>

		<ng-template #menu>
			<caps-menu class="min-w-56 rounded-lg">
				<caps-menu-label>
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<caps-avatar class="rounded-lg">
							<img [src]="u.avatar" [alt]="u.name" capsAvatarImage />
							<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">RG</caps-avatar-fallback>
						</caps-avatar>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{{ u.name }}</span>
							<span class="truncate text-xs">{{ u.email }}</span>
						</div>
					</div>
				</caps-menu-label>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon name="lucideSparkles" />
					Upgrade to Pro
				</button>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideBadgeCheck" />
						Account
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideCreditCard" />
						Billing
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideBell" />
						Notifications
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon name="lucideLogOut" />
					Log out
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class NavUser {
	protected readonly _avatarPlacement = computed<CapsMenuPlacement>(() => `${this._menuSide()}-end`);
	private readonly _sidebarService = inject(HlmSidebarService);
	protected readonly _menuSide = computed(() => (this._sidebarService.isMobile() ? 'top' : 'right'));

	public readonly user = input.required<{
		name: string;
		email: string;
		avatar: string;
	}>();
}
