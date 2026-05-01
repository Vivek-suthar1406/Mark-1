export default function Header() {
    return (
      <header id="header">
        {/* Notice style is now an object, and class is className */}
        <div className="innertube" style={{ color: 'white' }}>
          <p style={{ color: '#fff' }}>
            Website Mark-1(can add-logo,navbar links,dropdown menu,etc)
          </p>
        </div>
      </header>
    );
  }