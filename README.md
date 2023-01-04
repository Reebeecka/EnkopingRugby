        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/animals/:id" element={<ShowAnimal />} />
          <Route path="*" element={<NotFound />} />