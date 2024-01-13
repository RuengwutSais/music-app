import Header from '@/components/header'
import ListItem from '@/components/listItem'
import getSong from '@/script/getSong'
import PageContent from './components/pageContent';


export default async function Home() {
  const songs = await getSong();

  return (
    <div className='text-zinc-900 bg-white rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header>
        <div className="md-2 ">
        <h1 className='text-zinc-900 text-3xl font-semibold'>Welcome Back</h1>
        <div className=' grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
          <ListItem image='/images/liked.png' name='Liked' href='/liked'/>
        </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='fex- justify-between items-center'>
            <h1 className='text-2xl font-semibold'>
              Newest Songs
            </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
