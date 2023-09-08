
<template>
  <section class="hero is-medium is-info">
    <div class="hero-body with-back">
      <div class="container has-text-centered">
        <h1 class="title is-1">About project</h1>
      </div>
    </div>
  </section>
  <div class="container">
    <section class="about">
      <div class="column is-8 is-offset-2">
        <div class="card article">
          <div class="card-content">
            <div class="media">
              <div class="media-content has-text-centered">
                <p class="title is-4">Introducing project</p>
                <div class="tags has-addons level-item">
                  <span class="tag is-rounded is-info">@miramar</span>
                  <span class="tag is-rounded">{{ new Date().getFullYear() }}</span>
                </div>
              </div>
            </div>
            <div class="content article-body">
              <p class="subtitle">A project for portfolio on Vue using Firebase as backend (authorization, database etc.), state management Pinia</p>
              <p>Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. In hac habitasse platea
                dictumst vestibulum rhoncus est pellentesque elit. Accumsan lacus vel facilisis volutpat. Non sodales
                neque sodales ut etiam.
                Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.</p>
              <h3 class="has-text-centered">How to properly center tags in bulma?</h3>
              <p> Proper centering of tags in bulma is done with class: </p>
              <pre>level-item</pre>
              Voluptat ut farmacium tellus in metus vulputate. Feugiat in fermentum posuere urna nec. Pharetra convallis
              posuere morbi leo urna molestie.
              Accumsan lacus vel facilisis volutpat est velit egestas. Fermentum leo vel orci porta. Faucibus interdum
              posuere lorem ipsum.<p></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.with-back {
  background-image: url('@/assets/about-back.jpg');
  background-size: cover;
  background-position: center;
  height: 500px;
  margin-top: -50px;
}

.about {
  margin: 5rem 0;
  margin-top: -200px;
}
</style>
