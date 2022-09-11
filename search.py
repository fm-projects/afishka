from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import gradio as gr


model = SentenceTransformer('distiluse-base-multilingual-cased-v1')

data = {  # index: name
    1: 'К 140-летию со дня рождения Игоря Стравинского',
    2: 'Тренировки в Спортивном парке',
    3: 'Закрытие Большого летнего музыкального фестиваля «Сириус»',
    4: 'Вечер серенад с «Виртуозами Москвы»',
    5: 'Музыкальная сборная Россия. Фортепианный марафон',
    6: 'Религиозные мотивы в советской постмодернистской литературе',
    7: 'Мастер-класс по гравюре на офортном станке',
    8: 'Дискуссия «Между мягкой обложкой и коллекционным изданием»',
    9: 'Лекция и презентация книги «Древнерусская криптография»',
    10: 'Путешествие с Запада на Восток',
    11: 'Виктор Цой и группа «Кино». Фотографии. Воспоминания. Презентация книги',
    12: 'Кинопоказ в Мурино',
    13: '«КАРМЕН». ТЕАТРАЛЬНЫЙ КОНЦЕРТ', 
    14: '«ГОЛОСА РУССКОГО ОРКЕСТРА». КОНЦЕРТ АНДРЕЕВСКОГО ОРКЕСТРА Дирижер – Дмитрий Хохлов',
    15: '«ТАНГО И ДЖАЗ»',
    16: 'ПРИНОШЕНИЕ ИЛЬЕ МУСИНУ. ОРКЕСТР КОСТРОМСКОЙ ФИЛАРМОНИИ', 
    17: 'АНСАМБЛЬ ДОНСКИХ КАЗАКОВ ИМ. АНАТОЛИЯ КВАСОВА',
    18: 'ОТКРЫТИЕ КОНЦЕРТНОГО СЕЗОНА. ХОР И ОРКЕСТР КАПЕЛЛЫ',
    19: 'МИР Российская Премьер-Лига. Тур 8. "Краснодар" - "Сочи". ',
    20: 'Футбол. Лига чемпионов. "Аякс" (Нидерланды) - "Рейнджерс" (Шотландия). '
}

itms = list(data.values())

def sort_events(indices, similarities):
    results = sorted(dict(zip(indices, similarities)).items(), key=lambda item: item[1], reverse=True)
    return results

def search(query):
    query_embedding = model.encode(query)
    sentence_embeddings = {}
    for id, s in data.items():
        sentence_embeddings[id] = model.encode(s)
    similarities = cosine_similarity(
        [query_embedding],
        list(sentence_embeddings.values())
    ).tolist()[0]
    result = dict(sort_events(data.values(), similarities))
    return result



demo = gr.Interface(fn=search, inputs=['text'], outputs=[gr.Label(num_top_classes=10)])
demo.launch(share=True)