// export function StayDetailsSkeleton() {
//   return (
//     <section className="stay-details stay-details-skeleton">
//       <section className="title-section">
//         <div
//           className="skeleton skeleton-title"
//           style={{ width: "40%", height: "2.5rem" }}
//         />
//         <div
//           className="skeleton skeleton-btn"
//           style={{ width: "6rem", height: "2rem" }}
//         />
//       </section>
//       <section className="img-section">
//         {[1, 2, 3, 4, 5].map((i) => (
//           <div key={i} className={`img-wrapper img-${i}`}>
//             <div
//               className="skeleton"
//               style={{ width: "100%", height: "100%" }}
//             />
//           </div>
//         ))}
//       </section>
//       <section className="details-section">
//         <div className="reserve-container">
//           <div
//             className="skeleton"
//             style={{ width: "100%", height: "18rem", borderRadius: "1rem" }}
//           />
//         </div>
//         <div className="room-details-container">
//           <div
//             className="skeleton"
//             style={{ width: "60%", height: "1.5rem" }}
//           />
//           <div className="skeleton" style={{ width: "40%", height: "1rem" }} />
//           <div className="skeleton" style={{ width: "30%", height: "1rem" }} />
//         </div>
//         <div className="host-conclusions-grid">
//           <div className="host-container">
//             <div
//               className="skeleton"
//               style={{ width: "2.5em", height: "2.5em", borderRadius: "50%" }}
//             />
//             <div>
//               <div
//                 className="skeleton"
//                 style={{ width: "8rem", height: "1rem" }}
//               />
//               <div
//                 className="skeleton"
//                 style={{ width: "5rem", height: "0.8rem" }}
//               />
//             </div>
//           </div>
//           <div className="conclusions-container">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="conclusion">
//                 <div
//                   className="skeleton"
//                   style={{ width: "2em", height: "2em", borderRadius: "50%" }}
//                 />
//                 <div>
//                   <div
//                     className="skeleton"
//                     style={{ width: "6rem", height: "1rem" }}
//                   />
//                   <div
//                     className="skeleton"
//                     style={{ width: "10rem", height: "0.8rem" }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="summary-container">
//           <div
//             className="skeleton"
//             style={{ width: "100%", height: "2.5rem" }}
//           />
//           <div
//             className="skeleton"
//             style={{ width: "80%", height: "1.5rem" }}
//           />
//         </div>
//         <div className="amenities-container">
//           <div
//             className="skeleton"
//             style={{ width: "40%", height: "1.5rem" }}
//           />
//           <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="skeleton"
//                 style={{ width: "6rem", height: "1.2rem" }}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="date-picker-container">
//           <div
//             className="skeleton"
//             style={{ width: "30%", height: "1.5rem" }}
//           />
//           <div className="skeleton" style={{ width: "50%", height: "1rem" }} />
//           <div
//             className="skeleton"
//             style={{ width: "100%", height: "3rem", marginTop: "1rem" }}
//           />
//         </div>
//       </section>
//       <section className="reviews-section">
//         <div className="skeleton" style={{ width: "30%", height: "1.5rem" }} />
//         <div
//           className="skeleton"
//           style={{ width: "100%", height: "3rem", marginTop: "1rem" }}
//         />
//       </section>
//       <section className="map-section">
//         <div
//           className="skeleton"
//           style={{ width: "100%", height: "20rem", borderRadius: "1rem" }}
//         />
//       </section>
//     </section>
//   );
// }
export function StayDetailsSkeleton() {
  return (
    <section className="stay-details stay-details-skeleton">
      <section className="title-section">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-btn" />
      </section>
      <section className="img-section">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`img-wrapper img-${i}`}>
            <div className="skeleton skeleton-img" />
          </div>
        ))}
      </section>
      <section className="details-section">
        <div className="reserve-container">
          <div className="skeleton skeleton-reserve" />
        </div>
        <div className="room-details-container">
          <div className="skeleton skeleton-room-title" />
          <div className="skeleton skeleton-room-detail1" />
          <div className="skeleton skeleton-room-detail2" />
        </div>
        <div className="host-conclusions-grid">
          <div className="host-container">
            <div className="skeleton skeleton-host-img" />
            <div>
              <div className="skeleton skeleton-host-name" />
              <div className="skeleton skeleton-host-status" />
            </div>
          </div>
          <div className="conclusions-container">
            {[1, 2, 3].map((i) => (
              <div key={i} className="conclusion">
                <div className="skeleton skeleton-conclusion-img" />
                <div>
                  <div className="skeleton skeleton-conclusion-title" />
                  <div className="skeleton skeleton-conclusion-desc" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="summary-container">
          <div className="skeleton skeleton-summary-title" />
          <div className="skeleton skeleton-summary-desc" />
        </div>
        <div className="amenities-container">
          <div className="skeleton skeleton-amenities-title" />
          <div className="skeleton-amenities-list">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton skeleton-amenity" />
            ))}
          </div>
        </div>
        <div className="date-picker-container">
          <div className="skeleton skeleton-date-title" />
          <div className="skeleton skeleton-date-subtitle" />
          <div className="skeleton skeleton-date-picker" />
        </div>
      </section>
      <section className="reviews-section">
        <div className="skeleton skeleton-reviews-title" />
        <div className="skeleton skeleton-reviews-list" />
      </section>
      <section className="map-section">
        <div className="skeleton skeleton-map" />
      </section>
    </section>
  );
}
