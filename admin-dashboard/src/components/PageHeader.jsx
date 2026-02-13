/*
Reusable PageHeader component.

Why reusability improves maintainability:
Instead of writing header code in every page, we reuse PageHeader.
If we need to change design later, we change it in one place only.
*/

function PageHeader({ title, subtitle }) {

  return (

    <div className="page-header">

      <h1 className="page-title">{title}</h1>

      {subtitle && (
        <p className="page-subtitle">{subtitle}</p>
      )}

    </div>

  );

}

export default PageHeader;
