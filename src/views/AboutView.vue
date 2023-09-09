
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
              <p class="subtitle">A frontend project for portfolio. Todo list app with authorization, database. Created
                with:</p>
              <ul>
                <li>Vue 3</li>
                <li>Vue Router</li>
                <li>Firebase</li>
                <li>Pinia</li>
                <li>Bulma css</li>
              </ul>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis debitis blanditiis, eum totam laboriosam
                quidem vitae. Modi, et quos quod itaque voluptas sed error incidunt beatae consequatur ipsum laborum eius!
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore fugiat, reprehenderit alias suscipit
              molestias dolorem id sed placeat voluptate deserunt porro nisi, asperiores hic qui. Id ducimus officia velit
              perferendis, dolor eaque magni modi molestias, quo nisi minus eos veniam fugit qui accusantium recusandae
              nostrum maiores distinctio corporis neque laborum.</p>
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
