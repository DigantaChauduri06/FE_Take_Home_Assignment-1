import groupSvg from '@/assets/Group.svg';

export function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col bg-[#EEF2FA] min-h-full overflow-hidden">
      <div className="px-10 pt-10 pb-4">
        <p className="color-[#132C4A] font-['Rubik'] font-light text-2xl leading-8 mb-3">Let's get started</p>
        <h1 className="font-['Rubik'] font-bold text-5xl leading-[54px] mb-3">
          Create your<br />account
        </h1>
        <p className="font-['Rubik'] font-normal text-base leading-none">
          Follow the steps to create your account
        </p>
      </div>

      <div className="flex-1 flex items-end select-none pointer-events-none overflow-hidden">
        <img
          src={groupSvg}
          alt="Account creation illustration"
          className="w-full object-contain object-bottom"
          draggable={false}
        />
      </div>
    </div>
  );
}
