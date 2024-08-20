function QrbLoader() {
  return (
    <div className="pos-fixed top-0 left-0 w-full h-full bg-yellow-100 dark:bg-gray-800 dark">
      <div className="flex items-center">
        <div className="w-full bg-teal-600 dark:bg-teal-900 mt-[50px] py-5 text-white">
          <div className="container">
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"/>
            Processing...
          </div>
        </div>
      </div>
    </div>
  )
}

export default QrbLoader;