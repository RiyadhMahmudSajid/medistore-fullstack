export const dynamic = "force-dynamic";
// export const dynamic = "force-static";
import MyCart from '@/components/layout/cart/MyCart';


const page = () => {
  return (
    <div>
      <MyCart></MyCart>
    </div>
  );
};

export default page;