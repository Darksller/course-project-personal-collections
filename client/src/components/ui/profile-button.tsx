import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PersonIcon } from '@radix-ui/react-icons'

export function ProfileButton() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src='logo.svg' />
					<AvatarFallback>
						<PersonIcon />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Nickname</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer'>Log Out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
