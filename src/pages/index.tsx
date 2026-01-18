// app/page.tsx
import PageHead from '@/components/commons/PageHead';
import {Button} from '@nextui-org/react'; 

export default function Page() {
  return (
    <>
    <PageHead title='Home'/>
    

<Button color="primary" variant="shadow">
  Test NextUI
</Button>
<div className="h-20 w-20 bg-red-500">Test</div>
    </>
  )
}