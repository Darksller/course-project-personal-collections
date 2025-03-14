import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Sheet, SheetContent, SheetTrigger } from '../shadcn-ui/sheet'
import { Navigation } from './navigation'
import SearchBar from './search-bar'
import { useUiStore } from '@/store/useUiStore'

export function HamburgerMenu() {
  const { isNavSheetOpen, setIsNavSheetOpen } = useUiStore()
  return (
    <Sheet open={isNavSheetOpen} onOpenChange={setIsNavSheetOpen}>
      <SheetTrigger>
        <HamburgerMenuIcon className="h-6 w-6 lg:hidden" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] bg-white/60  backdrop-blur sm:w-[400px] dark:bg-purple-600/50 "
      >
        <Navigation className="flex flex-col gap-5 font-bold" />
        <SearchBar className="mt-10 sm:hidden" />
      </SheetContent>
    </Sheet>
  )
}
