# -*- coding: utf-8 -*-
from transformers import pipeline
def summary_text(data):
    summarizer = pipeline("summarization")
    ARTICLE = data
    summary_result=summarizer(ARTICLE, max_length=130, min_length=30, do_sample=False)
    summary_text = summary_result[0]['summary_text']

    # Print the actual summary text
    return summary_text