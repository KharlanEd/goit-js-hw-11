

import Notiflix from 'notiflix';
import { getAxios } from '../src/sass/js/fetch'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form')
const btnSearch = document.querySelector('.search-form-button');
const input = document.querySelector('.search-form input')
const imgList = document.querySelector('.gallery')
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
const btnLoadMore = document.querySelector('.load-more')



let pageNum = 1;
btnLoadMore.style.display = "none"
btnSearch.addEventListener('click', onClick)
btnLoadMore.addEventListener('click', pagClick)

async function onClick(evt) {

  evt.preventDefault();

  cleanGallery()
 

  const trimInput = input.value.trim()
  if (trimInput !== '') {
    getAxios(trimInput, pageNum).then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      } else {
        rendrList(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    })

  }

}

async function pagClick() {
  pageNum++;
  btnLoadMore.style.display = "none"
  const trimInput = input.value.trim()
  if (trimInput !== '') {
    getAxios(trimInput, pageNum).then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      } else {
        rendrList(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();

      }
    })

  }
}

async function rendrList(hits) {
  // console.log(hits, "hits");
  const marcup = hits.map(hit => {
    // console.log(hit,"hit");
    return `<div class="photo-card">
  <a href="${hit.largeImageURL}"><img class="photo" src="${hit.webformatURL}" alt="${hit.tags}" title="${hit.tags}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-item-api">${hit.likes} </span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="info-item-api">${hit.views} </span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="info-item-api">${hit.comments} </span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="info-item-api">${hit.downloads} </span>
    </p>
  </div>
</div>`
  }).join('');
  imgList.innerHTML += marcup;
}


async function cleanGallery() {
  imgList.innerHTML = '';
  pageNum = 1;
  btnLoadMore.style.display = 'none';
}