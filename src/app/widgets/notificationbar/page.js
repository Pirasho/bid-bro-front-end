import React from 'react';
// import Header from '../header/page';
// import Footer from '../footer/page';


const NotificationBar = ({ notifications, onViewMore }) => {
  return (
    <div className="fixed top-0 right-0 m-4 bg-white shadow-lg rounded-lg p-4 w-80">
      <h2 className="text-lg font-bold mb-2 heading-bar">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <div key={notification.id} className="flex items-center mb-4 border-b pb-2">
            <img
              src={notification.productImage}
              alt={notification.productName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="ml-4 flex-grow">
              <p className="font-semibold">{notification.productName}</p>
              <p className="text-gray-600">Expected Price: {notification.expectedPrice}</p>
              <button
                onClick={() => onViewMore(notification)}
                className="text-blue-500 hover:underline"
              >
                View More
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
};

export default NotificationBar;
